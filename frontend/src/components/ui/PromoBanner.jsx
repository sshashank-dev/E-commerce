
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

export default function PromoBanner({
    primaryProductId,
    secondaryProductId,
    badgeText = "",
    primaryBannerImage,
    secondaryBannerImage,
    className = "" // add default
}) {
    const navigate = useNavigate();
    const [primary, setPrimary] = useState(null);
    const [secondary, setSecondary] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (primaryProductId) {
                    const { data } = await api.get(`/products/${primaryProductId}`);
                    setPrimary(data);
                }
                if (secondaryProductId) {
                    const { data } = await api.get(`/products/${secondaryProductId}`);
                    setSecondary(data);
                }
            } catch (err) {
                console.error("Failed to fetch promo products:", err);
            }
        };
        fetchProducts();
    }, [primaryProductId, secondaryProductId]);

    if (!primary) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={`relative w-full overflow-hidden shadow-xl ${className}`}
        >
            {/* PRIMARY IMAGE */}
            <img
                src={primaryBannerImage || primary.bannerImage || primary.image}
                alt={primary.name}
                className="w-full h-[860px] md:h-[650px] object-cover"
            />

            {/* GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center">
                <div className="grid md:grid-cols-2 gap-12 w-full px-8 md:px-20 text-white">

                    {/* LEFT — PRIMARY PRODUCT */}
                    <div>
                        {badgeText && (
                            <span className="inline-block mb-4 px-4 py-1 text-xs tracking-widest uppercase border border-white/40">
                                {badgeText}
                            </span>
                        )}

                        <h2 className="text-4xl md:text-5xl font-semibold mb-5">
                            {primary.name}
                        </h2>

                        <p className="text-white/80 text-lg mb-8 max-w-xl">
                            {primary.description}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate(`/product/${primary._id}`)}
                                className="px-8 py-3 bg-white text-black font-medium hover:bg-gray-100 transition"
                            >
                                Buy now
                            </button>

                            <button
                                onClick={() => navigate(`/product/${primary._id}`)}
                                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition"
                            >
                                Learn more
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </motion.section>
    );
}
