import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import OrderSuccessPage from "../pages/order/OrderSuccessPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentPage />} />

            <Route path="/order-success" element={<OrderSuccessPage />} />
        </Routes>
    );
}