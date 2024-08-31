// index.js (main router file)
import express from "express";
import userRoute from "./userRoute.js";
import adminRoute from "./adminRoute.js";
import todoRoute from "./todo.js";

const router = express.Router();

router.use("/", userRoute);
router.use("/admin", adminRoute);
router.use("/todo", todoRoute);

export default router;
