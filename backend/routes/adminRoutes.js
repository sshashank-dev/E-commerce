import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/adminController.js";

const router = express.Router();




// Product Routes
router.route("/products").post(createProduct).get(getAllProducts);
router.route("/products/:id").put(updateProduct).delete(deleteProduct);

// Order Routes
router.route("/orders").get(getAllOrders);
router.route("/orders/:id").get(getOrderById).put(updateOrderStatus);

// User Routes
router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUserById).put(updateUser).delete(deleteUser);


export default router;