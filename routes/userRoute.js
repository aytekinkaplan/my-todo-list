// userRoute.js
import express from "express";
import { auth } from "../middleware/auth.js";
import * as userController from "../controllers/userController.js";
import upload from "../middleware/multerConfig.js";

const router = express.Router();

router.get("/register", userController.loadRegister);
router.post("/register", upload.single("image"), userController.insertUser);
router.get("/login", userController.loginLoad);
router.post("/login", userController.verifyLogin);
router.get("/home", auth, userController.loadHome);
router.get("/logout", auth, userController.logout);

export default router;
