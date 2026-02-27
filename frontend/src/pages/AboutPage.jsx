

import { motion } from "framer-motion";
import { useRef } from "react";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function Stat({ number, label }) {
    return (
        <motion.div
            whileHover={{ scale: 1.15, rotate: 2 }}
            className="text-center bg-white rounded-3xl shadow-xl p-6 cursor-pointer hover:shadow-2xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900">{number}</h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base">{label}</p>
        </motion.div>
    );
}

export default function AboutPage() {
    const ref = useRef(null);

    return (
        <div ref={ref} className="relative overflow-hidden bg-gray-50 min-h-screen pt-28 pb-24">

            {/* ===== Floating Background Orbs ===== */}
            <motion.div
                className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-300 opacity-20 rounded-full blur-3xl"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
            />
            <motion.div
                className="absolute top-60 -right-40 w-[500px] h-[500px] bg-blue-300 opacity-20 rounded-full blur-3xl"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
            />

            {/* ================= HERO ================= */}
            <section className="max-w-6xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Experience Shopping Reimagined
                    </h1>
                    <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto">
                        Built with performance, trust, and delightful interactions — just like world-class ecommerce platforms.
                    </p>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 180 }}
                        transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                        className="h-1 bg-purple-600 mx-auto mt-8 rounded-full"
                    />
                </motion.div>
            </section>

            {/* ================= STATS ================= */}
            <section className="max-w-5xl mx-auto px-6 mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
                <Stat number="10K+" label="Orders Delivered" />
                <Stat number="5K+" label="Happy Customers" />
                <Stat number="99%" label="Satisfaction Rate" />
                <Stat number="24/7" label="Support Available" />
            </section>

            {/* ================= STORY ================= */}
            <section className="max-w-6xl mx-auto px-6 mt-32 grid md:grid-cols-2 gap-16 items-center">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.h2 variants={item} className="text-3xl font-bold text-gray-900 mb-4">
                        Our Story
                    </motion.h2>
                    <motion.p variants={item} className="text-gray-600 leading-relaxed mb-4">
                        Your ecommerce platform is designed to deliver a smooth, animated, and trustworthy shopping experience.
                    </motion.p>
                    <motion.p variants={item} className="text-gray-600 leading-relaxed">
                        From cart to checkout to order celebration — every interaction is crafted to feel premium and effortless.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.08, rotate: 1 }}
                    className="relative group"
                >
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                        alt="Team"
                        className="rounded-3xl shadow-2xl w-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 rounded-3xl border border-white/40 group-hover:border-purple-400 transition" />
                </motion.div>
            </section>

            {/* ================= VALUES ================= */}
            <section className="max-w-7xl mx-auto px-6 mt-32">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center text-gray-900 mb-14"
                >
                    Why Customers Trust Us
                </motion.h2>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {["Premium Quality", "Fast Delivery", "Secure Payments", "Customer First"].map((title, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            whileHover={{ y: -10, scale: 1.07, boxShadow: "0px 20px 40px rgba(0,0,0,0.15)" }}
                            className="relative p-[1px] rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500"
                        >
                            <div className="bg-white rounded-2xl p-8 text-center h-full transition-all">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                                <p className="text-gray-500 text-sm md:text-base">
                                    Professional experience you can rely on.
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ================= MISSION ================= */}
            <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl shadow-2xl p-14 hover:shadow-3xl transition-shadow"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        To create an ecommerce experience that feels effortless, beautiful, and trustworthy — from first click to final delivery.
                    </p>
                </motion.div>
            </section>
        </div>
    );
}