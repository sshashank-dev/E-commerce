import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// POST a new message
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;

        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        const newMessage = await Message.create({ firstName, lastName, email, phone, message });
        console.log("New message saved:", newMessage);
        res.status(201).json(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Optional: GET all messages (for admin)
router.get("/", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
