import express from "express";
import { userCategory } from "../controllers";
import authenticateToken from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", userCategory.getAllCategory);
router.post("/", userCategory.createUserCategory);
router.delete("/:id", userCategory.deleteCategory);
router.use(authenticateToken);

export default router;
