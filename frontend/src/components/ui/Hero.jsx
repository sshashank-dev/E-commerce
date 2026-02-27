import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="relative h-[85vh] w-full rounded-3xl overflow-hidden pt-10">
            <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Premium watch on a dark background"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-8">
                <div className="max-w-xl text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-shadow">
                        Premium gadgets, unbeatable prices.
                    </h1>
                    <p className="text-lg mb-8 text-shadow-md">
                        Discover the future of shopping with our curated collection of high-quality electronics and accessories.
                    </p>
                    <Link to="/">
                        <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition transform hover:scale-105">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}