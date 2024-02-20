import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

// Registration user route
router.post("/register", authController.register);

// Login user route
router.post("/login", authController.login);

export default router;
