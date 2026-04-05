import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check, Home, ShoppingBag, MapPin, Package, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export default function OrderSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { clearCart } = useCart();

    const order = location.state?.order || JSON.parse(localStorage.getItem("lastOrder"));

    const customerName = user?.name || order?.shippingAddress?.fullName || "Customer";
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    // 🎉 HIGH-PERFORMANCE CONFETTI
    const fireCelebration = () => {
        const count = 200;
        const defaults = { origin: { y: 0.7 }, zIndex: 1000 };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
                colors: ["#000000", "#22c55e", "#ffffff"], // Match brand colors
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        clearCart();
        fireCelebration();
    }, []);

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h2 className="text-xl font-bold">No order found</h2>
                <button onClick={() => navigate("/")} className="px-6 py-2 bg-zinc-900 text-white rounded-full">Go Home</button>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <div className="min-h-screen bg-gray-100 pt-32 pb-20 px-4 overflow-x-hidden">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto space-y-6"
            >
                {/* SUCCESS CARD */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-10 text-center border border-zinc-100 shadow-sm relative overflow-hidden">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                        className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200"
                    >
                        <Check className="text-white" size={40} strokeWidth={3} />
                    </motion.div>

                    <h1 className="text-4xl font-black text-zinc-900 tracking-tight">Order Confirmed!</h1>
                    <p className="text-zinc-500 mt-3 font-medium text-lg">
                        High five, <span className="text-zinc-900 font-bold">{customerName}</span>! Your order is on the way.
                    </p>

                    <div className="mt-8 pt-8 border-t border-zinc-50 flex flex-wrap justify-center gap-8">
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Order ID</p>
                            <p className="font-bold text-zinc-900">#{order._id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</p>
                            <p className="font-bold text-emerald-600">Processing</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Arriving By</p>
                            <p className="font-bold text-zinc-900">{deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* DETAILS CARD */}
                    <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-zinc-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-zinc-100 rounded-lg text-zinc-900">
                                <MapPin size={20} />
                            </div>
                            <h2 className="text-lg font-bold">Delivery Address</h2>
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-zinc-900">{order.shippingAddress.fullName}</p>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                {order.shippingAddress.address}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                            </p>
                            <p className="text-sm font-medium text-zinc-900 mt-2">{order.shippingAddress.phone}</p>
                        </div>
                    </motion.div>

                    {/* PAYMENT SUMMARY */}
                    <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-zinc-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-zinc-100 rounded-lg text-zinc-900">
                                    <Package size={20} />
                                </div>
                                <h2 className="text-lg font-bold">Payment Summary</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500 font-medium">Subtotal</span>
                                    <span className="font-bold">₹{order.totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500 font-medium">Shipping</span>
                                    <span className="text-emerald-600 font-bold">Free</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-zinc-50 flex justify-between items-end">
                            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Total Paid</span>
                            <span className="text-3xl font-black text-zinc-900">₹{order.totalPrice}</span>
                        </div>
                    </motion.div>
                </div>

                {/* ITEMS LIST */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-zinc-100 shadow-sm">
                    <h2 className="text-lg font-bold mb-6">Items Purchased</h2>
                    <div className="divide-y divide-zinc-50">
                        {order.orderItems.map((item) => (
                            <div key={item.product} className="py-4 flex items-center gap-4 group">
                                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-zinc-50 border border-zinc-100" />
                                <div className="flex-1">
                                    <p className="font-bold text-zinc-900 text-sm">{item.name}</p>
                                    <p className="text-xs text-zinc-500 font-medium">{item.qty} × ₹{item.price}</p>
                                </div>
                                <p className="font-black text-zinc-900 text-sm">₹{item.qty * item.price}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* NAVIGATION ACTIONS */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.98] shadow-xl shadow-zinc-200"
                    >
                        <Home size={18} />
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate("/my-orders")}
                        className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all active:scale-[0.98]"
                    >
                        Track Order
                        <ChevronRight size={18} />
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}