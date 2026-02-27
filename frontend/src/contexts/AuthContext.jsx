


import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session on refresh (NOT after browser close)
    useEffect(() => {
        const stored = sessionStorage.getItem("auth");
        if (stored) {
            setUser(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post("/users/login", { email, password });
        sessionStorage.setItem("auth", JSON.stringify(data));
        setUser(data);
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await api.post("/users/register", { name, email, password });
        sessionStorage.setItem("auth", JSON.stringify(data));
        setUser(data);
    };

    const logout = () => {
        sessionStorage.removeItem("auth");
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}