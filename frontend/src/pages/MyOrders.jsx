import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        const fetchOrders = async () => {
            try {
                const { data } = await api.get("/orders/my");
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user, navigate]);
    
    const statusColor = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-100 text-green-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            case "Shipped": return "bg-blue-100 text-blue-700";
            default: return "bg-yellow-100 text-yellow-700";
        }
    };

    if (loading) return <div className="text-center py-20">Loading orders...</div>;

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white rounded-2xl shadow p-6">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID: <span className="font-semibold text-gray-800">{order._id}</span></p>
                                    <p className="text-xs text-gray-400 mt-1">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="border-t border-b py-4 my-4 space-y-3">
                                {order.orderItems.map(item => (
                                    <div key={item.product} className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-600">{item.qty} × ₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-right font-semibold text-lg">Total: ₹{order.totalPrice.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}