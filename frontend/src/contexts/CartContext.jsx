
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const getCartKey = () => {
        return user?._id
            ? `cart_user_${user._id}`
            : "cart_guest";
    };

    const loadCart = () => {
        const saved = localStorage.getItem(getCartKey());
        return saved ? JSON.parse(saved) : [];
    };

    const [cart, setCart] = useState([]);

    // ✅ Load cart whenever user changes (LOGIN / LOGOUT)
    useEffect(() => {
        setCart(loadCart());
    }, [user]);

    // ✅ Save cart
    useEffect(() => {
        localStorage.setItem(getCartKey(), JSON.stringify(cart));
    }, [cart, user]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === product._id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item._id !== productId)
        );
    };

    const updateQuantity = (productId, newQty) => {
        if (newQty <= 0) removeFromCart(productId);
        else {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item._id === productId
                        ? { ...item, qty: newQty }
                        : item
                )
            );
        }
    };

    const clearCart = () => {
        localStorage.removeItem(getCartKey());
        setCart([]);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}; 