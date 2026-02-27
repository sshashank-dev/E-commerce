

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Page Components
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyOrders from "../pages/MyOrders";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import AdminUser from "../pages/admin/AdminUser";
import ProductList from "../pages/admin/ProductList";
import OrderList from "../pages/admin/OrderList";
import PageWrapper from "../components/layout/PageWrapper";
import AdminRoute from "./AdminRoute";
import PaymentPage from "../pages/checkout/PaymentPage";
import OrderSuccessPage from "../pages/order/OrderSuccessPage";

import ProductsPage from "../pages/ProductsPage";



export default function AppRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/product/:id" element={<PageWrapper><ProductDetails /></PageWrapper>} />
                <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
                <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />




                <Route path="/products" element={<ProductsPage />} />

                <Route path="/my-orders" element={<PageWrapper><MyOrders /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route element={<AdminRoute />}>
                    <Route path="/admin/users" element={<AdminUser />} />
                    <Route path="/admin/products" element={<ProductList />} />
                    <Route path="/admin/orders" element={<OrderList />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}