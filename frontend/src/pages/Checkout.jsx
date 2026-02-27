

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

export default function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cart, totalPrice, cartCount } = useCart();

    const [shipping, setShipping] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
    });

    const handleChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!user) {
            navigate("/login?redirect=/checkout");
            return;
        }

        navigate("/payment", {
            state: {
                orderItems: cart,
                shippingAddress: shipping,
                totalPrice: totalPrice
            }
        });
    };

    if (cartCount === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-3 gap-8">
                <form
                    onSubmit={submitHandler}
                    className="md:col-span-2 bg-white p-6 rounded-xl shadow space-y-4"
                >
                    <h2 className="text-xl font-bold">Shipping Address</h2>

                    <input name="fullName" placeholder="Full Name" required className="input" onChange={handleChange} />
                    <input name="phone" placeholder="Phone Number" required className="input" onChange={handleChange} />
                    <input name="email" placeholder="Email" required className="input" onChange={handleChange} />
                    <input name="address" placeholder="Street Address" required className="input" onChange={handleChange} />

                    <div className="grid grid-cols-2 gap-4">
                        <input name="city" placeholder="City" required className="input" onChange={handleChange} />
                        <input name="state" placeholder="State" required className="input" onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input name="postalCode" placeholder="Pincode" required className="input" onChange={handleChange} />
                        <input name="country" value="India" disabled className="input bg-gray-100" />
                    </div>

                    <button className="btn-primary w-full mt-4">
                        Continue to Payment →
                    </button>
                </form>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="font-bold mb-4">Order Summary</h2>

                    {cart.map((item) => (
                        <div key={item._id} className="flex justify-between text-sm mb-2">
                            <span>{item.name} × {item.qty}</span>
                            <span>₹{item.price * item.qty}</span>
                        </div>
                    ))}

                    <hr className="my-4" />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
