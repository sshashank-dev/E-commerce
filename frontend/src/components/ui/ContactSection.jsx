import { useState } from "react";
import api from "../../services/api";
import { motion } from "framer-motion";
import { Send, Phone, Mail, User, MessageSquare } from "lucide-react";

// Clean, icon-based Input component
function Input({ label, icon: Icon, ...props }) {
    return (
        <div className="space-y-1.5">
            <label className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">
                {label}
            </label>
            <div className="relative">
                {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />}
                <input
                    {...props}
                    className={`w-full ${Icon ? 'pl-11' : 'px-4'} pr-4 py-3.5 bg-zinc-50 border border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl outline-none transition-all font-medium text-zinc-800 placeholder:text-zinc-300`}
                    required
                />
            </div>
        </div>
    );
}

export default function ContactSection() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState({ message: "", type: "" });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        setStatus({ message: "Sending...", type: "loading" });

        try {
            await api.post("/contact", form);
            setStatus({
                message: "Message sent! We'll be in touch soon.",
                type: "success",
            });

            setTimeout(() => {
                setForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    message: "",
                });
                setStatus({ message: "", type: "" });
            }, 3000);
        } catch (error) {
            setStatus({
                message: "Failed to send message. Please try again.",
                type: "error",
            });
            console.error(error);
        }
    };

    return (
        <section className="py-24 px-4 bg-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-zinc-100 overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">

                    {/* Form Side */}
                    <div className="p-8 md:p-14 lg:p-20 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-3">Contact Us</h2>
                            <p className="text-zinc-500 font-medium leading-relaxed">
                                Have a question about an order or a product? Our team is here to help you.
                            </p>
                        </motion.div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-5">
                                <Input
                                    label="First Name"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={form.firstName}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={form.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <Input
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    icon={Mail}
                                    placeholder="your@email.com"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Phone (Optional)"
                                    name="phone"
                                    icon={Phone}
                                    placeholder="+1 (555) 000-0000"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Your Message</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 text-zinc-300" size={16} />
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="How can we assist you today?"
                                        className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl outline-none transition-all font-medium text-zinc-800 placeholder:text-zinc-300 resize-none"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status.type === "loading"}
                                className={`w-full py-4 rounded-2xl text-white font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-zinc-200 mt-4 ${status.type === "loading"
                                    ? "bg-zinc-400 cursor-not-allowed"
                                    : "bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98]"
                                    }`}
                            >
                                {status.type === "loading" ? "Processing..." : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>

                            {/* Status Notifications */}
                            {status.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-2xl text-[13px] font-bold text-center border ${status.type === "success"
                                        ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                        : status.type === "error"
                                            ? "bg-rose-50 border-rose-100 text-rose-700"
                                            : "bg-zinc-50 border-zinc-100 text-zinc-600"
                                        }`}
                                >
                                    {status.message}
                                </motion.div>
                            )}
                        </form>
                    </div>

                    {/* Image Side - Styled as a Premium Card */}
                    <div className="hidden lg:block relative p-6">
                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative group">
                            <img
                                src="https://northbaysolutions.com/wp-content/uploads/2025/06/Transforming-Airline-CX-with-Managed-Conversational-AI.jpg"
                                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                alt="Support"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-70">Sellora Concierge</p>
                                <h3 className="text-2xl font-bold mb-2">We're here to help.</h3>
                                <p className="text-sm font-medium opacity-80">Expect a response from our dedicated support team within 24 hours.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}