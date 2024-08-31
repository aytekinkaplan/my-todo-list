import express from "express";
import { auth } from "../middleware/auth.js";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/", auth, adminController.loadDashboard);
router.get("/logout", auth, adminController.logout);
router.get("/login", adminController.loadLogin);
router.post("/login", adminController.verifyLogin);

export default router;
