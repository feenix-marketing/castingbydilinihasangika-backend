import express from "express";
import authenticateToken from "../middleware/auth.middleware";
import careerController from "../controllers/careers.controller";

const router = express.Router();

router.get("/", careerController.getAllCareers);
router.post("/", careerController.createCareer);
router.delete("/:id", careerController.deleteCareer);
// router.get("/:restaurantId", careerController.getCareersById);

// Restricted
router.patch("/:restaurantId", careerController.updateCareers);

export default router;
