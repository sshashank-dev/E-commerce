


import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    FaCheckCircle,
    FaBoxOpen,
    FaHome,
    FaShoppingBag,
    FaMapMarkerAlt,
} from "react-icons/fa";
import confetti from "canvas-confetti";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export default function OrderSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { clearCart } = useCart();

    const [exiting, setExiting] = useState(false);

    const order =
        location.state?.order ||
        JSON.parse(localStorage.getItem("lastOrder"));

    const customerName =
        user?.name ||
        order?.shippingAddress?.fullName ||
        "Customer";

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    // 🎉 PREMIUM CONFETTI CELEBRATION
    const fireCelebration = () => {
        const duration = 2500;
        const end = Date.now() + duration;
        const colors = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

        confetti({
            particleCount: 180,
            spread: 120,
            startVelocity: 45,
            gravity: 0.9,
            ticks: 200,
            origin: { x: 0.5, y: 0.55 },
            colors,
            scalar: 1.2,
        });

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 75,
                spread: 60,
                origin: { x: 0.1, y: 1 },
                colors,
            });

            confetti({
                particleCount: 3,
                angle: 105,
                spread: 60,
                origin: { x: 0.9, y: 1 },
                colors,
            });

            if (Date.now() < end) requestAnimationFrame(frame);
        })();
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        clearCart();
        fireCelebration();
    }, []);

    const goWithAnimation = (path) => {
        setExiting(true);
        setTimeout(() => navigate(path), 500);
    };

    if (!order) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-semibold">No order found</h2>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-6 py-3 bg-black text-white rounded-xl"
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16">
            <div className={`max-w-5xl w-full animate-fadeInUp ${exiting ? "animate-exit" : ""}`}>

                {/* SUCCESS HERO */}
                <div className="bg-white rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
                    <FaCheckCircle className="text-green-500 text-8xl mx-auto animate-pop" />

                    <h1 className="text-4xl font-bold mt-6">
                        Order Confirmed 🎉
                    </h1>

                    <p className="text-gray-600 mt-3 text-lg">
                        Thank you for shopping with us, <span className="font-semibold">{customerName}</span>
                    </p>
                </div>

                {/* ORDER INFO */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideUp">
                        <div className="flex items-center gap-3 mb-4">
                            <FaBoxOpen />
                            <h2 className="text-xl font-semibold">Order Summary</h2>
                        </div>

                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <span>Order ID</span>
                                <span className="font-medium">{order._id}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Total Paid</span>
                                <span className="text-lg font-bold text-green-600">
                                    ₹{order.totalPrice}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Estimated Delivery</span>
                                <span>{deliveryDate.toDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 animate-slideUp delay-100">
                        <div className="flex items-center gap-3 mb-4">
                            <FaMapMarkerAlt />
                            <h2 className="text-xl font-semibold">Delivery Address</h2>
                        </div>

                        <p className="font-medium">{order.shippingAddress.fullName}</p>
                        <p className="text-gray-600">
                            {order.shippingAddress.address},
                            {order.shippingAddress.city},
                            {order.shippingAddress.postalCode}
                        </p>
                        <p className="text-gray-600">{order.shippingAddress.phone}</p>
                    </div>
                </div>

                {/* ITEMS */}
                {order.orderItems && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 animate-slideUp delay-200">
                        <h2 className="text-xl font-semibold mb-6">Items Ordered</h2>

                        <div className="space-y-4">
                            {order.orderItems.map((item) => (
                                <div
                                    key={item.product}
                                    className="flex items-center gap-4 border rounded-xl p-4 hover:shadow-md transition"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-contain"
                                    />

                                    <div className="flex-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.qty} × ₹{item.price}
                                        </p>
                                    </div>

                                    <p className="font-semibold">
                                        ₹{item.qty * item.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fadeIn">
                    <button
                        onClick={() => goWithAnimation("/")}
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-xl hover:scale-105 transition"
                    >
                        <FaHome />
                        Go Home
                    </button>

                    <button
                        onClick={() => goWithAnimation("/products")}
                        className="flex items-center justify-center gap-2 px-8 py-4 border border-black rounded-xl hover:bg-black hover:text-white transition"
                    >
                        <FaShoppingBag />
                        Continue Shopping
                    </button>
                </div>
            </div>

            <style>{`
        .animate-fadeInUp { animation: fadeInUp 0.7s ease forwards; }
        .animate-slideUp { animation: slideUp 0.6s ease forwards; }
        .animate-pop { animation: pop 0.5s ease forwards; }
        .animate-exit { animation: exitPage 0.5s ease forwards; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pop {
          0% { transform: scale(0.6); opacity: 0; }
          80% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes exitPage {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95) translateY(30px); }
        }
      `}</style>
        </div>
    );
}