import { Link } from "react-router-dom";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../hooks/useCart";

export default function CartDrawer({ isOpen, onClose }) {
    const { cart, totalPrice, removeFromCart, updateQuantity } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* OVERLAY */}
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-40"
                    />

                    {/* DRAWER */}
                    <motion.div
                        key="drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 w-full max-w-md h-full z-50 flex flex-col bg-gray-50"
                    >
                        {/* HEADER */}
                        <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
                                <X size={24} className="text-gray-700" />
                            </button>
                        </div>

                        {/* ITEMS */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.length === 0 ? (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-center mt-10">
                                    Your cart is empty.
                                </motion.p>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm"
                                    >
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                                            <p className="text-gray-900 font-bold mt-1">₹{item.price * item.qty}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <button onClick={() => updateQuantity(item._id, item.qty - 1)} className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300 transition"><Minus size={14} /></button>
                                                <span className="font-medium text-gray-700 w-4 text-center">{item.qty}</span>
                                                <button onClick={() => updateQuantity(item._id, item.qty + 1)} className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300 transition"><Plus size={14} /></button>
                                            </div>
                                        </div>
                                        <motion.button onClick={() => removeFromCart(item._id)} whileHover={{ scale: 1.1 }} className="text-red-500 hover:text-red-600 p-2">
                                            <Trash2 size={18} />
                                        </motion.button>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* FOOTER */}
                        {cart.length > 0 && (
                            <motion.div className="p-4 border-t bg-white" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                <div className="flex justify-between font-semibold text-lg mb-4 text-gray-800">
                                    <span>Total</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                                <Link to="/checkout" onClick={onClose} className="block w-full text-center btn-primary py-3">
                                    Proceed to Checkout
                                </Link>
                                <Link to="/cart" onClick={onClose} className="block w-full mt-3 text-center text-sm text-indigo-600 hover:underline">
                                    View Full Cart
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}