import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: 1,
        title: "Stranger Worlds",
        subtitle: "Season 2 Now Streaming • Sci-Fi Adventure",
        action: "Watch Now",
        image: "https://is1-ssl.mzstatic.com/image/thumb/rNjkfQo5hWI0wljgs4AvjA/2500x1336sr.jpg",
    },
    {
        id: 2,
        title: "Future Horizon",
        subtitle: "Exclusive Premiere • A Journey Through Time",
        action: "Watch Now",
        image: "https://is1-ssl.mzstatic.com/image/thumb/OmAEHiPsBUBSNjqgm9ItjA/2500x1336sr.jpg",
    },
    {
        id: 3,
        title: "Urban Legends",
        subtitle: "Only on StreamX • Mystery & Suspense",
        action: "Watch Now",
        image: "https://is1-ssl.mzstatic.com/image/thumb/zLbkVwwHwe8I5EtuXc8wWg/2500x1336sr.jpg",
    },
    {
        id: 4,
        title: "Live Football",
        subtitle: "Watch every club, every match, live—all season long.",
        action: "Stream Live",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/f2/4e/e3/f24ee3d7-7259-eb81-141c-ecc587d62dff/9d737dbe-b401-4b72-94ef-74c77cf5a95a.png/2500x1336sr.jpg",
    },
];

export default function AppHeroSlider() {
    const [current, setCurrent] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        /* Section is now simple and matches the dark theme directly */
        <section className="relative w-full h-[65vh] md:h-[80vh] bg-gray-100 flex items-center justify-center overflow-hidden">

            {/* Main Card Container - No extra padding or blur borders */}
            <div className="relative w-full h-full md:w-[96%] md:h-[90%] md:rounded-[2rem] overflow-hidden bg-black">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    >
                        {/* Simple, sharp gradient mask */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        {/* Content Area */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                            <div className="max-w-3xl overflow-hidden">

                                {/* Slit-up Title Reveal */}
                                <div className="overflow-hidden">
                                    <motion.h2
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                                        className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-4"
                                    >
                                        {slides[current].title}
                                    </motion.h2>
                                </div>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="text-sm md:text-lg text-zinc-400 font-medium mb-8 max-w-xl"
                                >
                                    {slides[current].subtitle}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex gap-4"
                                >
                                    <button className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all active:scale-95">
                                        {slides[current].action}
                                    </button>
                                    <button className="px-8 py-3 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                                        Details
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Pagination (Minimalist Line Style) */}
                <div className="absolute bottom-10 right-10 flex gap-2 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-[2px] transition-all duration-500 ${i === current ? "w-12 bg-white" : "w-4 bg-white/20"}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}