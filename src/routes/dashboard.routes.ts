import { dashboardController } from "../controllers";
import express from "express";
import authenticateToken from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", dashboardController.getDashboard);

export default router;
