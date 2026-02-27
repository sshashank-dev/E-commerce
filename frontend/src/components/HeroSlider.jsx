

import { useEffect, useRef, useState } from "react";

const slides = [
    {
        id: 1,
        title: "Stranger Worlds",
        subtitle: "Season 2 Now Streaming",
        action: "Watch Now",
        image:
            "https://is1-ssl.mzstatic.com/image/thumb/rNjkfQo5hWI0wljgs4AvjA/2500x1336sr.jpg",
    },
    {
        id: 2,
        title: "Future Horizon",
        subtitle: "Exclusive Premiere",
        action: "Watch Now",
        image:
            "https://is1-ssl.mzstatic.com/image/thumb/OmAEHiPsBUBSNjqgm9ItjA/2500x1336sr.jpg",
    },
    {
        id: 3,
        title: "Urban Legends",
        subtitle: "Only on StreamX",
        action: "Watch Now",
        image:
            "https://is1-ssl.mzstatic.com/image/thumb/zLbkVwwHwe8I5EtuXc8wWg/2500x1336sr.jpg",
    },
    {
        id: 4,
        title: " ",
        subtitle: "Watch every club, every match, live—all season long.",
        action: "Watch Now",
        image:
            "https://is1-ssl.mzstatic.com/image/thumb/Features211/v4/f2/4e/e3/f24ee3d7-7259-eb81-141c-ecc587d62dff/9d737dbe-b401-4b72-94ef-74c77cf5a95a.png/2500x1336sr.jpg",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const startX = useRef(0);
    const isDragging = useRef(false);

    // Auto-slide every 6s
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") prevSlide();
            else if (e.key === "ArrowRight") nextSlide();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const handleStart = (x) => {
        isDragging.current = true;
        startX.current = x;
    };

    const handleMove = (x) => {
        if (!isDragging.current) return;
        setDragOffset(x - startX.current);
    };

    const handleEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;

        if (dragOffset < -80) nextSlide();
        else if (dragOffset > 80) prevSlide();

        setDragOffset(0);
    };

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <section
            className="w-screen h-screen relative overflow-hidden select-none cursor-grab active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
            onMouseDown={(e) => {
                e.preventDefault();
                handleStart(e.clientX);
            }}
            onMouseMove={(e) => {
                if (!isDragging.current) return;
                e.preventDefault();
                handleMove(e.clientX);
            }}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
        >
            {/* Sliding track */}
            <div
                className="flex h-full transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
                    willChange: "transform",
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className="w-screen flex-none relative h-screen"
                        style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
                    >
                        {/* Background image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                transform: `translateX(${dragOffset * 0.3}px)`,
                                willChange: "transform",
                            }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        {/* Text */}
                        <div className="absolute bottom-32 left-10 md:left-20 text-white max-w-xl">
                            <h2
                                className={`text-5xl md:text-7xl font-bold tracking-tight transform transition-all duration-1000 ease-in-out ${index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                            >
                                {slide.title}
                            </h2>
                            <p
                                className={`mt-3 text-xl md:text-2xl transform transition-all duration-1000 ease-in-out ${index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                            >
                                {slide.subtitle}
                            </p>
                            <button
                                className={`mt-6 px-8 py-3 bg-red-600 rounded-md font-semibold text-lg hover:bg-red-700 transition-all duration-500 ease-in-out transform ${index === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                            >
                                {slide.action}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-[3px] rounded-full transition-all duration-1000 ease-in-out ${i === current ? "w-14 bg-white" : "w-6 bg-white/30"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}