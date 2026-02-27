


import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        res.status(201).json({
            success: true,
            message: "Message saved successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
