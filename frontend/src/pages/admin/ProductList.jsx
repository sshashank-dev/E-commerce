import { useEffect, useState } from "react";
import api from "../../services/api";
import { Edit, Trash2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [currentProduct, setCurrentProduct] = useState({
        name: "",
        price: "",
        image: "",
        category: "",
        countInStock: "",
        description: "",
        isFeatured: false,
        isBestSeller: false,
    });

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/admin/products");
            setProducts(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const openCreate = () => {
        setIsEditing(false);
        setCurrentProduct({
            name: "",
            price: "",
            image: "",
            category: "",
            countInStock: "",
            description: "",
            isFeatured: false,
            isBestSeller: false,
        });
        setShowModal(true);
    };

    const openEdit = (p) => {
        setIsEditing(true);
        setCurrentProduct(p);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentProduct((p) => ({
            ...p,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        isEditing
            ? await api.put(`/admin/products/${currentProduct._id}`, currentProduct)
            : await api.post(`/admin/products`, currentProduct);
        setShowModal(false);
        fetchProducts();
    };

    const deleteHandler = async (id) => {
        if (!confirm("Delete this product permanently?")) return;
        await api.delete(`/admin/products/${id}`);
        fetchProducts();
    };

    if (loading)
        return <div className="p-10 text-gray-500">Loading products…</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="p-8"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Products
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage catalog and inventory
                    </p>
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800"
                >
                    <Plus size={16} /> New Product
                </button>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-gray-600">
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Stock</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Tags</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <motion.tr
                                key={p._id}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.15 }}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img
                                        src={p.image}
                                        className="w-10 h-10 rounded object-cover border"
                                    />
                                    <span className="font-medium text-gray-900">
                                        {p.name}
                                    </span>
                                </td>

                                <td className="px-6 py-4">₹{p.price}</td>
                                <td className="px-6 py-4">{p.countInStock}</td>
                                <td className="px-6 py-4">{p.category}</td>

                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        {p.isFeatured && (
                                            <span className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-700">
                                                Featured
                                            </span>
                                        )}
                                        {p.isBestSeller && (
                                            <span className="px-2 py-1 text-xs rounded bg-green-50 text-green-700">
                                                Best Seller
                                            </span>
                                        )}
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => openEdit(p)}
                                            className="p-1.5 rounded border hover:bg-gray-100"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteHandler(p._id)}
                                            className="p-1.5 rounded border text-red-600 hover:bg-red-50"
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

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.96, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.96, y: 20 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="sticky top-0 bg-white border-b px-6 py-4">
                                <h2 className="text-lg font-semibold">
                                    {isEditing ? "Edit Product" : "Create Product"}
                                </h2>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
                            >
                                {[
                                    ["Name", "name"],
                                    ["Price", "price"],
                                    ["Stock", "countInStock"],
                                    ["Category", "category"],
                                ].map(([label, name]) => (
                                    <div key={name}>
                                        <label className="block text-gray-600 mb-1">
                                            {label}
                                        </label>
                                        <input
                                            name={name}
                                            value={currentProduct[name]}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-3 py-2"
                                            required
                                        />
                                    </div>
                                ))}

                                <div className="md:col-span-2">
                                    <label className="block text-gray-600 mb-1">
                                        Image URL
                                    </label>
                                    <input
                                        name="image"
                                        value={currentProduct.image}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-600 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={currentProduct.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                </div>

                                <div className="md:col-span-2 flex gap-6">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="isFeatured"
                                            checked={currentProduct.isFeatured}
                                            onChange={handleChange}
                                        />
                                        Featured
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="isBestSeller"
                                            checked={currentProduct.isBestSeller}
                                            onChange={handleChange}
                                        />
                                        Best Seller
                                    </label>
                                </div>

                                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 rounded-lg border"
                                    >
                                        Cancel
                                    </button>
                                    <button className="px-4 py-2 rounded-lg bg-gray-900 text-white">
                                        {isEditing ? "Save Changes" : "Create Product"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
