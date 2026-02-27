import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            const loggedInUser = await login(email, password);
            if (loggedInUser.isAdmin) {
                navigate("/admin/products");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>
                {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@example.com" required />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" required />
                </div>
                <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl text-white font-semibold transition ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p className="text-sm text-gray-600 mt-6 text-center">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-indigo-600 font-medium hover:underline">Register</Link>
                </p>
            </form>
        </div>
    );
}