import { dashboardController } from "../controllers";
import express from "express";
import authenticateToken from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", dashboardController.getDashboard);
// router.get("/dishes", dashboardController.getAllDishCategoriesWithDishes);
// router.get("/:id", dashboardController.getDishCategoryById);

// // Restricted
// router.use(authenticateToken);
// router.post("/", dashboardController.createDishCategory);
// router.put("/:id", dashboardController.updateDishCategory);
// router.delete("/:id", dashboardController.deleteDishCategory);

export default router;
