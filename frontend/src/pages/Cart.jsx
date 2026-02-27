


import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, totalPrice, cartCount } = useCart();

    // ⭐ PREMIUM EMPTY CART UI
    if (cartCount === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center max-w-md w-full bg-white rounded-3xl shadow-xl p-10 animate-fadeInUp">

                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-6">
                        <ShoppingCart size={36} className="text-gray-500" />
                    </div>

                    <h2 className="text-3xl font-bold mb-3">
                        Your cart feels lonely 🛒
                    </h2>

                    <p className="text-gray-600 mb-8">
                        Looks like you haven’t added anything yet.
                        Start exploring and find something you love.
                    </p>

                    <Link
                        to="/products"
                        className="inline-block w-full py-4 rounded-xl bg-black text-white font-semibold hover:scale-105 transition"
                    >
                        Continue Shopping
                    </Link>

                    <p className="text-sm text-gray-400 mt-4">
                        Secure checkout · Easy returns
                    </p>
                </div>

                <style>{`
                    .animate-fadeInUp {
                        animation: fadeInUp 0.6s ease forwards;
                    }
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(40px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        );
    }

    // ⭐ KEEP YOUR EXISTING UI WHEN ITEMS EXIST
    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div key={item._id} className="flex items-center justify-between bg-white rounded-2xl shadow p-5">
                            <div className="flex items-center gap-5">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl border" />

                                <div>
                                    <h2 className="font-semibold text-lg">{item.name}</h2>
                                    <p className="font-bold text-gray-800 mt-1">₹{item.price}</p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.qty - 1)}
                                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <span>{item.qty}</span>

                                        <button
                                            onClick={() => updateQuantity(item._id, item.qty + 1)}
                                            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-28">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link
                        to="/checkout"
                        className="block mt-8 w-full text-center btn-primary"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}