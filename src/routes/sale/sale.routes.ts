import { Router } from "express";
import promotionController from "../../controllers/sale/sale.controller";
import authMiddleware from "../../middleware/auth-middleware";

const router = Router();

router.post("/:id/apply", authMiddleware, promotionController.applyPromo.bind(promotionController));
router.post("/:id/remove", authMiddleware, promotionController.removePromo.bind(promotionController));

export default router;
