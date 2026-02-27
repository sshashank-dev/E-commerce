


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../hooks/useCart";
import { motion } from "framer-motion";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (err) {
                console.error("Product not found:", err);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleBuyNow = () => {
        addToCart({ ...product, qty: 1 });
        navigate("/checkout");
    };

    const handleAddToCart = () => {
        addToCart({ ...product, qty: 1 });
    };

    if (loading) return <div className="text-center py-32 text-lg">Loading product…</div>;
    if (!product) return null;

    return (
        <div className="max-w-5xl mx-40 px-4 pt-15 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                {/* IMAGE FRAME WITH ANIMATION */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-lg p-8 flex items-center justify-center"
                >
                    <div className="w-full h-[450px] flex items-center justify-center overflow-hidden rounded-2xl relative">
                        <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>

                {/* DETAILS */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                        {product.name}
                    </h1>

                    {/* PRICE + STOCK */}
                    <div className="flex items-center gap-4">
                        <p className="text-3xl font-extrabold text-indigo-600">
                            ₹{product.price}
                        </p>

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                                ${product.countInStock > 0
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }
                            `}
                        >
                            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-gray-600 leading-relaxed text-base">
                        {product.description}
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.countInStock === 0}
                            className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={handleBuyNow}
                            disabled={product.countInStock === 0}
                            className="px-8 py-3 rounded-full bg-gray-900 hover:bg-black text-white font-semibold transition disabled:opacity-50"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* TRUST INFO */}
                    <div className="pt-6 border-t text-sm text-gray-500 space-y-1">
                        <p>✔ 100% Original Products</p>
                        <p>✔ Secure Payments</p>
                        <p>✔ Fast Delivery</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
