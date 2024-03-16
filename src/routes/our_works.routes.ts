import express from "express";
import authenticateToken from "../middleware/auth.middleware";
import { ourWorksController } from "../controllers";

const router = express.Router();

// router.use(authenticateToken);
router.post("/", ourWorksController.createOurWork);
router.delete("/:id", ourWorksController.deleteOurWork);
router.get("/", ourWorksController.getOurWorks);
router.put("/complete/:orderId", ourWorksController.completeOrder);
router.get("/:orderId", ourWorksController.getOrderById);

export default router;
