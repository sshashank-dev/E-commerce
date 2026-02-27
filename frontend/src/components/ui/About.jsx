

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* ---------- Counter Component ---------- */
function Counter({ value, label }) {
    const { ref, inView } = useInView({ triggerOnce: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / value), 20);

        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= value) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <div ref={ref} className="text-center">
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                {count}+
            </h3>
            <p className="text-gray-500 dark:text-gray-400">{label}</p>
        </div>
    );
}

/* ---------- About Section ---------- */
export default function About() {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const parallaxY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    return (
        <section className="relative py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">

            {/* Floating background shapes */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

                {/* LEFT TEXT */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
                        About Our Store
                    </span>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        Technology that fits your <span className="text-indigo-600">lifestyle</span>
                    </h2>

                    <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300">
                        Premium gadgets, powerful devices, and trusted service — all in one modern ecommerce experience.
                    </p>

                    {/* Counters */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <Counter value={10} label="Years Experience" />
                        <Counter value={1000} label="Products" />
                        <Counter value={10000} label="Happy Customers" />
                    </div>

                    {/* CTA */}
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/about")}
                        className="mt-12 px-12 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-xl"
                    >
                        Discover More →
                    </motion.button>
                </motion.div>

                {/* RIGHT IMAGE */}
                <motion.div
                    style={{ y: parallaxY }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                    <img
                        src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
                        alt="Tech Store"
                        className="w-full h-full object-cover rounded-3xl"
                    />

                    {/* Overlay shapes */}
                    <div className="absolute -top-16 -left-16 w-32 h-32 bg-purple-400 opacity-30 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 opacity-30 rounded-full blur-2xl animate-pulse" />
                </motion.div>
            </div>

            {/* BRAND SLIDER */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-24 overflow-hidden relative"
            >
                <div className="flex gap-16 animate-scroll px-10">
                    {["Samsung", "Apple", "Sony", "Dell", "HP", "Asus"].map((brand, i) => (
                        <div
                            key={i}
                            className="text-2xl font-bold text-gray-400 dark:text-gray-500 whitespace-nowrap hover:text-indigo-600 transition-transform duration-300 hover:scale-110"
                        >
                            {brand}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Decorative moving circles */}
            <div className="absolute top-0 left-1/2 w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-2xl animate-pulse -translate-x-1/2" />
            <div className="absolute bottom-0 right-1/3 w-56 h-56 bg-yellow-300 rounded-full opacity-20 blur-2xl animate-pulse" />

        </section>
    );
}