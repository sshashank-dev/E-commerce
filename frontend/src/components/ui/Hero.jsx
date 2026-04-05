import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroVideo from "../../assets/hero-video.mp4";

export default function Hero() {
    return (
        <section className="relative h-screen w-full bg-gray-100 p-4 md:p-10 flex items-center justify-center  ">

            {/* --- CINEMATIC CONTAINER --- */}
            <motion.div
                initial={{ opacity: 0, scale: 0.99 }} // Minimal scale diff for less re-render lag
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                className="relative h-full w-full rounded-[4rem] md:rounded-[6rem] overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] bg-black border border-white/5 will-change-transform"
            >
                {/* --- HARDWARE ACCELERATED VIDEO BACKGROUND --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, ease: "linear" }}
                    className="absolute inset-0 w-full h-full transform-gpu"
                >
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover grayscale-[30%] brightness-[0.4] will-change-transform"
                    >
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                </motion.div>

                {/* --- SILKY SMOOTH OVERLAY --- */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

                {/* --- CONTENT LAYER --- */}
                <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">

                    {/* Decorative Line - Vertical Grow Animation */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 64, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                        className="w-px bg-emerald-500/40 blur-[0.5px] mb-10"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <h1 className="text-6xl md:text-[9vw] font-black text-white tracking-tighter leading-[0.8] mb-6 italic">
                            SELLORA
                        </h1>
                        <p className="text-zinc-500 font-light uppercase text-[10px] md:text-xs tracking-[0.8em] opacity-80">
                            High-Performance Ecosystem
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.8, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        className="mt-24"
                    >
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#000000" }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center gap-8 bg-white/5 backdrop-blur-3xl border border-white/10 text-white px-14 py-7 rounded-full font-black uppercase text-[10px] tracking-[0.4em] transition-all duration-700 ease-[0.23, 1, 0.32, 1]"
                            >
                                Enter Store
                                <ArrowRight size={18} className="text-emerald-500 group-hover:translate-x-2 transition-transform duration-500" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                {/* --- SYSTEM OVERLAYS --- */}
                <div className="absolute bottom-12 left-12 md:bottom-16 md:left-16 hidden sm:block">
                    <p className="text-white/10 text-[9px] font-mono tracking-[0.4em] uppercase">
                        Origin // Hub_Jaipur_01
                    </p>
                </div>

                <div className="absolute bottom-12 right-12 md:bottom-16 md:right-16 hidden sm:flex items-center gap-6">
                    <span className="text-white/10 text-[9px] font-mono tracking-[0.4em] uppercase">
                        Status: Optimized
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-pulse" />
                </div>
            </motion.div>
        </section>
    );
}