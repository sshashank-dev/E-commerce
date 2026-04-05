import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }
        try {
            setLoading(true);
            await register(name, email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Join Sellora</h2>
                        <p className="text-zinc-500 mt-2 font-medium">Create your account to start shopping</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-2"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl outline-none transition-all font-medium text-zinc-800 placeholder:text-zinc-300"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl outline-none transition-all font-medium text-zinc-800 placeholder:text-zinc-300"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-[0.1em] text-zinc-400 ml-1">Secure Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-transparent focus:border-zinc-200 focus:bg-white rounded-2xl outline-none transition-all font-medium text-zinc-800 placeholder:text-zinc-300"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 mt-4 rounded-2xl text-white font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-zinc-200 ${loading ? "bg-zinc-400 cursor-not-allowed" : "bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98]"
                                }`}
                        >
                            {loading ? "Creating Account..." : (
                                <>
                                    Register <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        <div className="pt-4 text-center">
                            <p className="text-sm text-zinc-500 font-medium">
                                Already have an account?{" "}
                                <Link to="/login" className="text-zinc-900 font-black hover:underline underline-offset-4">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}