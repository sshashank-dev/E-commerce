import { useEffect, useState } from "react";
import api from "../../services/api";
import { motion } from "framer-motion";

export default function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/admin/orders");
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/admin/orders/${orderId}`, { status: newStatus });
            fetchOrders();
        } catch (error) {
            console.error("Failed to update order status:", error);
            alert("Error updating status.");
        }
    };

    const statusOptions = ["Placed", "Shipped", "Delivered", "Cancelled"];

    const statusColor = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-500/10 text-green-600";
            case "Cancelled": return "bg-red-500/10 text-red-600";
            case "Shipped": return "bg-blue-500/10 text-blue-600";
            default: return "bg-yellow-500/10 text-yellow-600";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 text-gray-500 animate-pulse">
                Loading orders…
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    Order Management
                </h1>
                <p className="text-gray-500 mt-2">
                    Track and manage customer orders in real time
                </p>
            </div>

            {/* Table Container */}
            <div className="bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100/60 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <motion.tr
                                key={order._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className="border-b last:border-none hover:bg-gray-50/70 transition"
                            >
                                <td className="px-6 py-4 font-mono text-xs text-gray-600">
                                    {order._id}
                                </td>

                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {order.user?.name || "N/A"}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900">
                                    ₹{order.totalPrice.toFixed(2)}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(order.status)}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleStatusChange(order._id, e.target.value)
                                        }
                                        className="text-xs bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
