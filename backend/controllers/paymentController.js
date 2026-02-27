import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
} else {
    console.warn("Razorpay keys not found. Payment routes will not work.");
}

// @desc    Create a Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
export const createPaymentOrder = asyncHandler(async (req, res) => {
    if (!razorpay) {
        res.status(500);
        throw new Error("Razorpay is not configured on the server.");
    }

    const { amount } = req.body; // Amount in rupees

    const options = {
        amount: Math.round(amount * 100), // Convert to paise
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500);
        throw new Error("Failed to create Razorpay order");
    }
});

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Public (Webhook or client-side verification)
export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        // Here, you would typically update your database order status to "Paid"
        // For now, we just confirm success.
        res.json({ success: true, message: "Payment verified successfully" });
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
    }
});