import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get("/products");
                setProducts(data);
            } catch (err) {
                console.error("Products fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-xl">
                Loading products...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 cursor-pointer"
                        onClick={() => navigate(`/product/${product._id}`)}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-40 w-full object-contain mb-4"
                        />

                        <h2 className="font-semibold">{product.name}</h2>

                        <p className="text-gray-600 text-sm line-clamp-2">
                            {product.description}
                        </p>

                        <p className="text-lg font-bold mt-2">
                            ₹{product.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}