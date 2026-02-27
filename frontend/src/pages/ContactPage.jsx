import { useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState({ message: "", type: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: "Sending...", type: "loading" });
        try {
            await api.post("/contact", form);
            setStatus({ message: "Message sent successfully! We'll be in touch.", type: "success" });
            setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        } catch (err) {
            setStatus({ message: err.response?.data?.message || "Failed to send message.", type: "error" });
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-800">Get In Touch</h1>
                    <p className="text-gray-600 text-center mb-10">We'd love to hear from you. Please fill out the form below.</p>
                </motion.div>
                <motion.form onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="input" required />
                        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="input" required />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="input" required />
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (Optional)" className="input" />
                    </div>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={5} className="input" required />
                    <button type="submit" className="w-full btn-primary py-3" disabled={status.type === 'loading'}>
                        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                    {status.message && (
                        <p className={`mt-4 text-center text-sm font-medium ${
                            status.type === 'success' ? 'text-green-600' : 
                            status.type === 'error' ? 'text-red-600' : 'text-gray-600'
                        }`}>{status.message}</p>
                    )}
                </motion.form>
            </div>
        </div>
    );
}