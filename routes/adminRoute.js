import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/", protect, adminController.loadDashboard);
router.get("/logout", protect, adminController.logout);
router.get("/login", adminController.loadLogin);
router.post("/login", adminController.verifyLogin);

export default router;
