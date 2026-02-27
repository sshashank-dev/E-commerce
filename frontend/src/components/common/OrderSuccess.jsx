import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess({ show, onClose }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white p-8 rounded-2xl flex flex-col items-center gap-4 shadow-lg text-center"
                    >
                        <CheckCircle className="text-green-500" size={64} />
                        <h2 className="text-2xl font-bold text-gray-800">Order Placed Successfully!</h2>
                        <p className="text-gray-600">You can view your order in the "My Orders" page.</p>
                        <button
                            onClick={onClose}
                            className="mt-4 px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}