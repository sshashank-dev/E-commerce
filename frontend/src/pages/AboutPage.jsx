import { motion } from "framer-motion";
import {
    ShoppingBag,
    Truck,
    ShieldCheck,
    Zap,
    ArrowRight,
    Box,
    Star,
    Globe
} from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
    show: { transition: { staggerChildren: 0.1 } }
};

export default function AboutPage() {
    return (
        <div className=" bg-gray-100 min-h-screen pt-24 pb-20 font-sans selection:bg-emerald-500 selection:text-white">

            {/* --- App Background Pattern --- */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* --- COMPACT HERO --- */}
                <header className="mb-20">
                    <motion.div initial="hidden" animate="show" variants={fadeInUp}>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                                <ShoppingBag size={16} className="text-emerald-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">About Sellora</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-none mb-6">
                            The ecosystem for <br />
                            <span className="text-emerald-600 italic">modern commerce.</span>
                        </h1>

                        <p className="text-zinc-500 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
                            Based in Jaipur, Sellora is built to simplify high-end retail. We connect premium global brands with a seamless, automated delivery infrastructure.
                        </p>
                    </motion.div>
                </header>

                {/* --- APP-STYLE STATS GRID --- */}
                <motion.section
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
                >
                    {[
                        { label: "Products", val: "12k+", icon: Box },
                        { label: "Dispatch", val: "24h", icon: Zap },
                        { label: "Trust", val: "99.9%", icon: Star },
                        { label: "Network", val: "Global", icon: Globe }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <stat.icon size={18} className="text-zinc-300 group-hover:text-emerald-500 mb-4 transition-colors" />
                            <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">{stat.val}</h3>
                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.section>

                {/* --- CLEAN CONTENT BLOCK --- */}
                <section className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Our Infrastructure</h2>

                        <div className="space-y-6">
                            {[
                                { title: "Quality Sourcing", desc: "Every item in our catalog is verified for authenticity and performance.", icon: ShieldCheck },
                                { title: "Swift Fulfillment", desc: "Automated logistics from our Jaipur hub ensures record-breaking delivery.", icon: Truck }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5">
                                    <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center shrink-0">
                                        <item.icon size={20} className="text-zinc-900" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-zinc-900 mb-1">{item.title}</h4>
                                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-zinc-100 rounded-3xl aspect-video relative overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
                            alt="Warehouse"
                            className="w-full h-full object-cover grayscale opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
                    </motion.div>
                </section>

                {/* --- COMPACT CTA --- */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
                    <h2 className="text-4xl font-black text-white tracking-tighter mb-8 relative z-10">
                        Experience the <br /> Sellora advantage.
                    </h2>
                    <button className="bg-emerald-500 text-zinc-900 px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2 mx-auto relative z-10 shadow-xl shadow-emerald-500/20 hover:scale-105 transition-transform">
                        Start Shopping <ArrowRight size={14} />
                    </button>
                </motion.section>

            </div>
        </div>
    );
}