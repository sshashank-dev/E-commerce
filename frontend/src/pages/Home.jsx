

import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../hooks/useCart";
import ProductCard from "../components/ui/ProductCard";
import Hero from "../components/ui/Hero";
import PromoBanner from "../components/ui/PromoBanner";
import ContactSection from "../components/ui/ContactSection";
import AboutPage from "./AboutPage";
import HeroSlider from "../components/HeroSlider";
export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await api.get("/products");
                setProducts(data);
            } catch (err) {
                console.error("Failed to load products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const bestSellers = products.filter((p) => p.isBestSeller);
    const featuredProducts = products.filter((p) => p.isFeatured);

    const primaryPromoId = featuredProducts[0]?._id;
    const secondaryPromoId = featuredProducts[1]?._id;
    const thirdPromoId = featuredProducts[2]?._id;

    if (loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <>
            {/* Main page container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 py-12">

                {/* HERO */}
                <Hero />

                {/* ALL PRODUCTS */}
                <section>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">All Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
                        ))}
                    </div>
                </section>

                {/* SECOND PROMO BANNER (SINGLE PRODUCT) */}
                {thirdPromoId && (
                    <PromoBanner
                        primaryProductId={primaryPromoId}
                        badgeText="No Cost EMI Available"
                        primaryBannerImage="https://i.ytimg.com/vi/Q5We_5Lw9oI/maxresdefault.jpg"
                        className="rounded-3xl"
                    />
                )}

                {/* BEST SELLERS */}
                {bestSellers.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Best Sellers</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {bestSellers.map((product) => (
                                <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
                            ))}
                        </div>
                    </section>
                )}

                {/* PROMO BANNER (DUAL PRODUCT + OFFER) */}
                {primaryPromoId && (
                    <PromoBanner
                        primaryProductId={thirdPromoId} primaryPromoId
                        secondaryProductId={secondaryPromoId}
                        badgeText="Save ₹10,000 with Exchange"
                        primaryBannerImage="https://mir-s3-cdn-cf.behance.net/project_modules/fs/e36a04153586409.6332b1f042f2f.png"
                        secondaryBannerImage="https://example.com/samsung-buds-banner.png"
                    />
                )}



            </div>


            <h1 className="font-apple text-5xl md:text-5xl font-bold text-black text-center pb-10 pt-2">
                Endless Entertainment.
            </h1>



            {/* HERO SLIDER - FULL WIDTH OUTSIDE CONTAINER */}
            <HeroSlider />



            <div className="mt-20">
                <ContactSection />
            </div>

            <div className="mt-20">
                <AboutPage />
            </div>
        </>
    );
}