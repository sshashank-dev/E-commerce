import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Package } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = document.getElementById("hero")?.offsetHeight || 600;
            setShow(window.scrollY < heroHeight - 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const containerVariants = {
        initial: { y: -100, opacity: 0, scale: 0.95 },
        animate: {
            y: 0, opacity: 1, scale: 1,
            transition: {
                type: "spring", stiffness: 300, damping: 28, mass: 0.5,
                staggerChildren: 0.03, delayChildren: 0.02
            }
        },
        exit: { y: -100, opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
        exit: { opacity: 0, transition: { duration: 0.1 } }
    };

    return (
        <AnimatePresence mode="popLayout">
            {show && (
                <motion.nav
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout // CRITICAL: Handles the internal width changes
                    className="fixed top-6 left-0 right-0 mx-auto z-50 flex justify-between items-center px-8 py-3 w-[92%] max-w-6xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/30 bg-white/80 backdrop-blur-md text-black select-none"
                >
                    <motion.div variants={itemVariants} layout>
                        <Link to="/" className="text-xl font-black tracking-[0.2em] uppercase text-zinc-900">
                            Sellora
                        </Link>
                    </motion.div>

                    <div className="flex items-center gap-6">
                        <motion.div variants={itemVariants} className="hidden md:flex items-center gap-6 text-[14px] font-semibold">
                            {user?.isAdmin ? (
                                <div key="admin-links" className="flex gap-6">
                                    <Link className="hover:opacity-50 transition-opacity" to="/admin/products">Products</Link>
                                    <Link className="hover:opacity-50 transition-opacity" to="/admin/orders">Orders</Link>
                                    <Link className="hover:opacity-50 transition-opacity" to="/admin/users">Users</Link>
                                </div>
                            ) : (
                                <Link key="home-link" className="hover:opacity-50 transition-opacity" to="/">Home</Link>
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants} className="h-4 w-[1px] bg-zinc-200 hidden md:block" />

                        {/* This container uses AnimatePresence to swap Auth vs Profile */}
                        <motion.div layout className="flex items-center gap-4">
                            <AnimatePresence mode="wait">
                                {user ? (
                                    <motion.div
                                        key="user-logged-in"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="flex items-center gap-3"
                                    >
                                        {!user.isAdmin && (
                                            <Link to="/my-orders" className="flex items-center gap-2 px-2 py-1.5 text-[13px] font-bold text-zinc-700 hover:text-black transition-all">
                                                <Package size={16} />
                                                <span className="hidden sm:inline">My Orders</span>
                                            </Link>
                                        )}
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200">
                                            <User size={15} className="text-zinc-500" />
                                            <span className="text-[13px] font-bold text-zinc-700">{user.name?.split(" ")[0]}</span>
                                        </div>
                                        <button onClick={handleLogout} className="text-zinc-400 p-1 hover:text-red-500 transition-colors">
                                            <LogOut size={18} />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="user-logged-out"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="flex items-center gap-4 text-[14px] font-bold"
                                    >
                                        <Link to="/login" className="hover:text-zinc-500">Login</Link>
                                        <Link to="/register" className="bg-zinc-900 text-white px-5 py-2 rounded-full">Register</Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!user?.isAdmin && (
                                <motion.button
                                    layout
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => navigate("/cart")}
                                    className="relative p-2 bg-zinc-900 text-white rounded-full shadow-lg"
                                >
                                    <ShoppingCart size={18} />
                                    {cartCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full min-w-[18px] h-[18px] text-[10px] flex items-center justify-center font-bold border-2 border-white"
                                        >
                                            {cartCount}
                                        </motion.span>
                                    )}
                                </motion.button>
                            )}
                        </motion.div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}