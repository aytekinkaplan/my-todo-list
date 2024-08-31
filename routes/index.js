import express from "express";
import userRoutes from "./userRoute.js";
import todoRoutes from "./todo.js";
import adminRoutes from "./adminRoute.js";

const router = express.Router();

router.use("/", userRoutes);
router.use("/todo", todoRoutes);
router.use("/admin", adminRoutes);

export default router;
