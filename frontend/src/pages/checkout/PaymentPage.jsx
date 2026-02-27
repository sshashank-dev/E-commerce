
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";


// 💡 Fix: PaymentDetails is moved outside to prevent focus loss
function PaymentDetails({
    method,
    upiId,
    setUpiId,
    wallet,
    setWallet,
    cardDetails,
    setCardDetails,
}) {
    switch (method) {
        case "upi":
            return (
                <input
                    type="text"
                    placeholder="Enter UPI ID"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-3 border rounded mt-2"
                />
            );

        case "card":
            return (
                <div className="space-y-2 mt-2">
                    <input
                        type="text"
                        placeholder="Card Number"
                        value={cardDetails.number}
                        onChange={(e) =>
                            setCardDetails({ ...cardDetails, number: e.target.value })
                        }
                        className="w-full p-3 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={cardDetails.name}
                        onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                        }
                        className="w-full p-3 border rounded"
                    />
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                                setCardDetails({ ...cardDetails, expiry: e.target.value })
                            }
                            className="flex-1 p-3 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                                setCardDetails({ ...cardDetails, cvv: e.target.value })
                            }
                            className="w-20 p-3 border rounded"
                        />
                    </div>
                </div>
            );

        case "wallet":
            return (
                <select
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="w-full p-3 border rounded mt-2"
                >
                    <option value="">Select Wallet</option>
                    <option value="paytm">Paytm</option>
                    <option value="mobikwik">Mobikwik</option>
                    <option value="amazonpay">Amazon Pay</option>
                </select>
            );

        case "cod":
            return (
                <p className="mt-2 text-gray-600">
                    You will pay when the order arrives.
                </p>
            );

        default:
            return null;
    }
}

export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const orderData = location.state;


    // If user refreshes page or comes directly
    if (!orderData) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">Session expired</h2>
                <button
                    onClick={() => navigate("/checkout")}
                    className="mt-4 px-6 py-3 bg-black text-white rounded-xl"
                >
                    Go back to checkout
                </button>
            </div>
        );
    }

    const [method, setMethod] = useState("upi");
    const [processing, setProcessing] = useState(false);

    const [upiId, setUpiId] = useState("");
    const [wallet, setWallet] = useState("");
    const [promoCode, setPromoCode] = useState("");

    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });

    // Pricing
    const subtotal = orderData.orderItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );
    const deliveryCharge = subtotal > 500 ? 0 : 50;
    const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
    const total = subtotal + deliveryCharge - discount;

    const payNow = async () => {
        if (processing) return;
        setProcessing(true);

        try {
            if (method === "upi" && !upiId) throw new Error("Enter UPI ID");
            if (method === "card") {
                const { number, name, expiry, cvv } = cardDetails;
                if (!number || !name || !expiry || !cvv) throw new Error("Fill card details");
            }
            if (method === "wallet" && !wallet) throw new Error("Select wallet");

            const { data } = await api.post("/orders", {
                orderItems: orderData.orderItems.map((item) => ({
                    product: item._id || item.id,
                    name: item.name,
                    qty: item.qty,
                    price: item.price,
                    image: item.image,
                })),
                shippingAddress: orderData.shippingAddress,
                totalPrice: total,
                paymentMethod: method,
                isPaid: method !== "cod",
            });

            const order = data.order || data;
            localStorage.setItem("lastOrder", JSON.stringify(order));

            navigate("/order-success", {
                state: { order },
                replace: true,
            });

        } catch (err) {
            console.error("Order error:", err);
            alert(err.response?.data?.message || err.message || "Order failed");
            setProcessing(false);
        }
    };

    const PaymentOption = ({ value, title, subtitle }) => (
        <div
            onClick={() => setMethod(value)}
            className={`p-4 rounded-xl border cursor-pointer mb-2 transition
            ${method === value ? "border-black bg-gray-50 shadow" : "border-gray-200 hover:border-black"}`}
        >
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto py-14 px-4 grid lg:grid-cols-2 gap-8">
            {/* Payment Section */}
            <div>
                <h1 className="text-3xl font-bold mb-6">Payment</h1>

                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <PaymentOption value="upi" title="UPI Payment" subtitle="Google Pay, PhonePe, Paytm" />
                    <PaymentOption value="card" title="Credit / Debit Card" subtitle="Visa, Mastercard, RuPay" />
                    <PaymentOption value="wallet" title="Wallet" subtitle="Paytm, Mobikwik, Amazon Pay" />
                    <PaymentOption value="cod" title="Cash on Delivery" subtitle="Pay when order arrives" />

                    {/* 💡 FIXED: PaymentDetails input stays focused now */}
                    <PaymentDetails
                        method={method}
                        upiId={upiId}
                        setUpiId={setUpiId}
                        wallet={wallet}
                        setWallet={setWallet}
                        cardDetails={cardDetails}
                        setCardDetails={setCardDetails}
                    />

                    <input
                        type="text"
                        placeholder="Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full p-3 border rounded mt-4"
                    />

                    <button
                        onClick={payNow}
                        disabled={processing}
                        className="w-full mt-6 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 transition"
                    >
                        {processing ? "Processing..." : "Pay Securely"}
                    </button>

                    <p className="text-center text-xs text-gray-500 mt-2">
                        100% Secure Payment · SSL Encrypted
                    </p>
                </div>
            </div>

            {/* Order Summary */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <div className="bg-white rounded-2xl shadow-xl p-6 space-y-3 max-h-[600px] overflow-y-auto">
                    {orderData.orderItems.map((item) => (
                        <div key={item._id || item.id} className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-gray-500 text-sm">
                                        {item.qty} × ₹{item.price}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold">₹{item.qty * item.price}</p>
                        </div>
                    ))}
                    <div className="border-t pt-3 space-y-2 text-gray-700">
                        <div className="flex justify-between">Subtotal <span>₹{subtotal}</span></div>
                        <div className="flex justify-between">Delivery <span>₹{deliveryCharge}</span></div>
                        <div className="flex justify-between">Discount <span>-₹{discount}</span></div>
                        <div className="flex justify-between font-bold text-lg">
                            Total <span>₹{total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}