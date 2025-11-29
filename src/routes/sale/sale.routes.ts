import { Router } from "express";
import saleController from "../../controllers/sale/sale.controller";
import authMiddleware from "../../middleware/auth-middleware";

const router = Router();

// Todas as rotas de venda devem ser protegidas
router.get("/", authMiddleware, saleController.getAll.bind(saleController));
router.get("/:id", authMiddleware, saleController.getById.bind(saleController));
router.post("/", authMiddleware, saleController.create.bind(saleController));
router.delete("/:id", authMiddleware, saleController.delete.bind(saleController));

export default router;
