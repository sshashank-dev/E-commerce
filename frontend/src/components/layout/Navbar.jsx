



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const [show, setShow] = useState(true);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // 🔥 scroll hide navbar
    useEffect(() => {
        const handleScroll = () => {
            const heroHeight =
                document.getElementById("hero")?.offsetHeight || 600;
            setShow(window.scrollY < heroHeight - 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`
                fixed top-6 left-1/2 -translate-x-1/2 z-50
                bg-white text-black
                px-9 py-3
                flex justify-between items-center
                rounded-full shadow-xl
                max-w-6xl w-[92%]
                transition-all duration-500 ease-in-out
                ${show
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10 pointer-events-none"
                }
            `}
        >
            {/* LOGO */}
            <Link
                to="/"
                className="text-xl font-bold tracking-[0.15em] uppercase hover:text-gray-400 transition"
            >
                Sellora
            </Link>

            {/* LINKS */}
            <div className="flex items-center gap-5">
                {user?.isAdmin ? (
                    <>
                        <Link className="nav-link" to="/admin/products">Products</Link>
                        <Link className="nav-link" to="/admin/orders">Orders</Link>
                        <Link className="nav-link" to="/admin/users">Users</Link>
                    </>
                ) : (
                    <Link className="nav-link" to="/">Home</Link>
                )}

                {/* CART TEXT BUTTON */}
                {!user?.isAdmin && (
                    <button
                        onClick={() => navigate("/cart")}
                        className="relative flex items-center gap-1 text-[15px] font-medium tracking-wide text-gray-700 hover:text-black"
                    >
                        Cart
                        {cartCount > 0 && (
                            <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                )}

                {/* USER */}
                {user ? (
                    <>
                        {!user.isAdmin && (
                            <Link
                                to="/my-orders"
                                className="text-[15px] font-medium tracking-wide text-gray-700 hover:text-black"
                            >
                                My Orders
                            </Link>
                        )}

                        <div className="flex items-center gap-2 text-gray-600">
                            <User size={16} />
                            <span className="hidden md:inline text-sm">
                                {user.name.split(" ")[0]}
                            </span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/register">Register</Link>
                    </>
                )}

                {/* CART ICON */}
                {!user?.isAdmin && (
                    <button
                        onClick={() => navigate("/cart")}
                        className="relative"
                    >
                        <ShoppingCart size={18} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                )}
            </div>
        </nav>
    );
}
