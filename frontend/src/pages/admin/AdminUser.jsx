import { useEffect, useState } from "react";
import api from "../../services/api";
import { Trash2, Shield, ShieldOff } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/admin/users");
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteHandler = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/admin/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Error deleting user.");
        }
    };

    const toggleAdmin = async (id, isAdmin) => {
        try {
            await api.put(`/admin/users/${id}`, { isAdmin: !isAdmin });
            fetchUsers();
        } catch (error) {
            console.error("Failed to update user role:", error);
            alert("Error updating user role.");
        }
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
                Loading users…
            </div>
        );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-8"
        >
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Users
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage platform users and access levels
                </p>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 font-medium text-gray-600">
                                User ID
                            </th>
                            <th className="px-6 py-3 font-medium text-gray-600">
                                Name
                            </th>
                            <th className="px-6 py-3 font-medium text-gray-600">
                                Email
                            </th>
                            <th className="px-6 py-3 font-medium text-gray-600">
                                Role
                            </th>
                            <th className="px-6 py-3 font-medium text-gray-600 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <motion.tr
                                key={u._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.15 }}
                                className="border-b border-gray-100 hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                    {u._id}
                                </td>

                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    {u.name}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {u.email}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex px-2.5 py-1 rounded text-xs font-medium
                      ${u.isAdmin
                                                ? "bg-green-50 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {u.isAdmin ? "Admin" : "User"}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => toggleAdmin(u._id, u.isAdmin)}
                                            title={u.isAdmin ? "Remove admin role" : "Grant admin role"}
                                            className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-100"
                                        >
                                            {u.isAdmin ? (
                                                <ShieldOff size={16} />
                                            ) : (
                                                <Shield size={16} />
                                            )}
                                        </button>

                                        <button
                                            onClick={() => deleteHandler(u._id)}
                                            title="Delete user"
                                            className="p-1.5 rounded border border-gray-200 text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
