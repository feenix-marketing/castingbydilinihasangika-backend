import express from "express";
import authenticateToken from "../middleware/auth.middleware";
import careerController from "../controllers/careers.controller";

const router = express.Router();

router.get("/", careerController.getAllCareers);
router.post("/", careerController.createCareer);
router.delete("/:id", careerController.deleteCareer);
// router.get("/:restaurantId", careerController.getRestaurantById);

// Restricted
router.patch("/:restaurantId", careerController.updateRestaurant);
router.use(authenticateToken);

export default router;
