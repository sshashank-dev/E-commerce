import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product, onAddToCart }) {
    return (
        <motion.div
            layout
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
        >
            <Link to={`/product/${product._id}`} className="block">
                <div className="group overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {product.description}
                    </p>
                    <p className="text-xl font-bold text-indigo-600 mt-3">
                        ₹{product.price}
                    </p>
                </div>
            </Link>
            <div className="p-4 pt-0 mt-auto">
                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-black text-white py-2 rounded-xl transition-all duration-200 ease-out hover:bg-gray-800 hover:shadow-lg active:scale-95"
                >
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
}