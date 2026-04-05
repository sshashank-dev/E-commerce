import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { Package, Calendar, ChevronRight, ShoppingBag, Clock, CheckCircle, XCircle, Truck } from "lucide-react";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        const fetchOrders = async () => {
            try {
                const { data } = await api.get("/orders/my");
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user, navigate]);

    // Logic for colors stays the same, just made more "vibrant" for the UI
    const getStatusStyles = (status) => {
        switch (status) {
            case "Delivered": return { css: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: <CheckCircle size={14} /> };
            case "Cancelled": return { css: "bg-rose-50 text-rose-700 border-rose-100", icon: <XCircle size={14} /> };
            case "Shipped": return { css: "bg-sky-50 text-sky-700 border-sky-100", icon: <Truck size={14} /> };
            default: return { css: "bg-amber-50 text-amber-700 border-amber-100", icon: <Clock size={14} /> };
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-900 rounded-full"
            />
            <p className="text-zinc-500 font-medium animate-pulse text-sm tracking-wide">Fetching your orders...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black text-zinc-900 tracking-tight"
                    >
                        My Orders
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 mt-2 font-medium"
                    >
                        Review your purchase history and track active shipments.
                    </motion.p>
                </header>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm"
                    >
                        <div className="bg-zinc-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="text-zinc-300" size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-900">No orders yet</h2>
                        <p className="text-zinc-500 mt-2 mb-8 max-w-xs mx-auto">Items you purchase will appear here once you've completed checkout.</p>
                        <Link to="/" className="bg-zinc-900 text-white px-8 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all inline-block shadow-lg shadow-zinc-200">
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order, index) => {
                            const styles = getStatusStyles(order.status);
                            return (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/30 transition-all duration-500"
                                >
                                    {/* Card Top */}
                                    <div className="p-6 md:p-8 flex flex-wrap justify-between items-center gap-4 border-b border-zinc-50">
                                        <div className="flex gap-4 items-center">
                                            <div className="p-3 bg-zinc-900 text-white rounded-2xl shadow-lg shadow-zinc-200 transition-transform group-hover:scale-110">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-400">Order Ref</p>
                                                <p className="text-sm font-bold text-zinc-900">#{order._id.slice(-8).toUpperCase()}</p>
                                            </div>
                                        </div>

                                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-wider ${styles.css}`}>
                                            {styles.icon}
                                            {order.status}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 md:p-8 space-y-6">
                                        {order.orderItems.map((item) => (
                                            <div key={item.product} className="flex items-center gap-5">
                                                <div className="relative">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 rounded-xl object-cover ring-1 ring-zinc-100 shadow-sm"
                                                    />
                                                    <div className="absolute -top-2 -right-2 bg-zinc-900 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                                                        {item.qty}
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-zinc-900 text-sm leading-tight">{item.name}</p>
                                                    <p className="text-xs text-zinc-500 font-semibold mt-1 tracking-wide">
                                                        ₹{item.price.toLocaleString()} per unit
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Card Footer */}
                                    <div className="px-6 py-5 md:px-8 bg-zinc-50/50 rounded-b-[2rem] flex justify-between items-center border-t border-zinc-50">
                                        <div className="flex items-center gap-2 text-zinc-400">
                                            <Calendar size={14} />
                                            <span className="text-[11px] font-bold uppercase tracking-widest">
                                                {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] uppercase tracking-[0.1em] font-black text-zinc-400 mb-0.5">Total Amount</p>
                                            <p className="text-xl font-black text-zinc-900">₹{order.totalPrice.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}