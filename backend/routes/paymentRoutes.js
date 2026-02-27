

import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

// CREATE ORDER
router.post("/create-order", async (req, res) => {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.log("❌ Razorpay keys missing in environment variables");
            return res.status(500).json({ message: "Payment service not configured" });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const { amount } = req.body;

        const options = {
            amount: Number(amount) * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ message: "Payment creation failed" });
    }
});

export default router;
