


import { useState } from "react";
import api from "../../services/api";

function Input({ label, ...props }) {
    return (
        <div>
            <label className="text-sm text-gray-700 mb-2 block">{label}</label>
            <input
                {...props}
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                required
            />
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
                message: "✅ Message sent! We'll be in touch soon.",
                type: "success",
            });

            // Clear form after 2 seconds
            setTimeout(() => {
                setForm({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    message: "",
                });
                setStatus({ message: "", type: "" });
            }, 2000);
        } catch (error) {
            setStatus({
                message: "❌ Failed to send message. Please try again.",
                type: "error",
            });
            console.error(error);
        }
    };

    return (
        <section className="w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            {/* Form Section */}
            <div className="flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-xl">
                    <h2 className="text-4xl font-semibold text-gray-900">Contact Us</h2>
                    <p className="text-gray-500 mt-2 mb-8">
                        Reach out for inquiries or assistance.
                    </p>

                    <form onSubmit={submitHandler} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <Input
                                label="First Name"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                            />
                            <Input
                                label="Last Name"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            <Input
                                label="Phone (Optional)"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-700 mb-2 block">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-4 rounded-xl text-white transition ${status.type === "loading"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800"
                                }`}
                            disabled={status.type === "loading"}
                        >
                            {status.type === "loading" ? "Submitting..." : "Submit"}
                        </button>

                        {status.message && (
                            <p
                                className={`mt-4 text-center text-sm font-medium ${status.type === "success"
                                    ? "text-green-600"
                                    : status.type === "error"
                                        ? "text-red-600"
                                        : "text-gray-600"
                                    }`}
                            >
                                {status.message}
                            </p>
                        )}
                    </form>
                </div>
            </div>

            {/* Image Section */}
            <div className="hidden lg:block">
                <img
                    src="https://northbaysolutions.com/wp-content/uploads/2025/06/Transforming-Airline-CX-with-Managed-Conversational-AI.jpg"
                    className="w-full h-full object-cover"
                    alt="Customer service representative"
                />
            </div>
        </section>
    );
}
