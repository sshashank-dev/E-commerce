// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function ProductCard({ product, onAddToCart }) {
//     return (
//         <motion.div
//             layout
//             whileHover={{ y: -8 }}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
//         >
//             <Link to={`/product/${product._id}`} className="block">
//                 <div className="group overflow-hidden">
//                     <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
//                     />
//                 </div>
//                 <div className="p-4 flex-grow">
//                     <h3 className="text-lg font-semibold text-gray-900 truncate">
//                         {product.name}
//                     </h3>
//                     <p className="text-gray-500 text-sm mt-1 line-clamp-2">
//                         {product.description}
//                     </p>
//                     <p className="text-xl font-bold text-indigo-600 mt-3">
//                         ₹{product.price}
//                     </p>
//                 </div>
//             </Link>
//             <div className="p-4 pt-0 mt-auto">
//                 <button
//                     onClick={() => onAddToCart(product)}
//                     className="w-full bg-black text-white py-2 rounded-xl transition-all duration-200 ease-out hover:bg-gray-800 hover:shadow-lg active:scale-95"
//                 >
//                     Add to Cart
//                 </button>
//             </div>
//         </motion.div>
//     );
// }




import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product, onAddToCart }) {
    return (
        <motion.div
            layout
            // Subtle lift and scale on the whole card
            whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] }
            }}
            className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col transition-shadow duration-500"
        >
            <Link to={`/product/${product._id}`} className="block group">
                <div className="overflow-hidden bg-gray-50">
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        // Smooth cinematic zoom on hover
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-64 object-cover"
                    />
                </div>

                <div className="p-5 flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-black transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-2xl font-black text-black mt-3">
                            ₹{product.price.toLocaleString('en-IN')}
                        </p>
                    </div>
                </div>
            </Link>

            <div className="p-5 pt-0 mt-auto">
                <motion.button
                    // Tactile feedback logic
                    whileTap={{ scale: 0.94 }}
                    whileHover={{
                        backgroundColor: "#111",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.15)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-black text-white py-3.5 rounded-2xl font-semibold tracking-wide transition-colors"
                >
                    Add to Cart
                </motion.button>
            </div>
        </motion.div>
    );
}