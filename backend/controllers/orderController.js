import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, totalPrice, paymentMethod, isPaid } = req.body;

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }

    // Validate shippingAddress
    const { address, city, postalCode, country } = shippingAddress || {};
    if (!address || !city || !postalCode || !country) {
        res.status(400);
        throw new Error("Incomplete shipping address");
    }

    const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        totalPrice,
        paymentMethod: paymentMethod || "cod",
        isPaid: isPaid || false,
        status: "Placed",
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});


// @desc    Get logged in user's orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
});

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    // Ensure the user cancelling the order is the one who placed it
    if (order.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("User not authorized to cancel this order");
    }

    if (order.status !== "Placed") {
        res.status(400);
        throw new Error(`Cannot cancel an order with status: ${order.status}`);
    }

    order.status = "Cancelled";
    const updatedOrder = await order.save();
    res.json(updatedOrder);
});