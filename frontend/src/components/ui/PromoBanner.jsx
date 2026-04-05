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
    className = ""
}) {
    const navigate = useNavigate();
    const [primary, setPrimary] = useState(null);
    const [secondary, setSecondary] = useState(null);

    const transition = { duration: 1.2, ease: [0.23, 1, 0.32, 1] };

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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={transition}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative w-full rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl group ${className}`}
        >
            {/* PRIMARY IMAGE */}
            <motion.img
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                src={primaryBannerImage || primary.bannerImage || primary.image}
                alt={primary.name}
                className="w-full h-[860px] md:h-[650px] object-cover will-change-transform"
            />

            {/* GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center">
                <div className="grid md:grid-cols-2 gap-12 w-full px-8 md:px-20 text-white">

                    {/* LEFT — PRIMARY PRODUCT */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                            }
                        }}
                    >
                        {badgeText && (
                            <motion.span
                                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                                transition={transition}
                                className="inline-block mb-6 px-4 py-1 text-[10px] tracking-[0.3em] uppercase border border-white/20 bg-white/5 backdrop-blur-md"
                            >
                                {badgeText}
                            </motion.span>
                        )}

                        {/* --- SLIT UP REVEAL CONTAINER --- */}
                        <div className="overflow-hidden">
                            <motion.h2
                                variants={{
                                    hidden: { opacity: 0, y: "100%" },
                                    show: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                                className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic uppercase leading-[0.9]"
                            >
                                {primary.name}
                            </motion.h2>
                        </div>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            transition={transition}
                            className="text-white/60 text-lg mb-10 max-w-xl font-light leading-relaxed"
                        >
                            {primary.description}
                        </motion.p>

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            transition={transition}
                            className="flex gap-6"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(`/product/${primary._id}`)}
                                className="px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors duration-500"
                            >
                                Buy now
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(`/product/${primary._id}`)}
                                className="px-10 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm transition-all duration-500"
                            >
                                Learn more
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Corner Accent Detail */}
            <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="w-20 h-px bg-white" />
            </div>
        </motion.section>
    );
}