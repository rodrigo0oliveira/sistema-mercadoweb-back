// src/routes/user/user.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import UserController from "../../controllers/user/user.controller";
import authMiddleware from "../../middleware/auth-middleware";

const router = Router();

/**
 * small helper middleware para verificar role="admin"
 * usa req.userInfo (populado pelo authMiddleware)
 */
const requireAdmin = (req: Request & { userInfo?: any }, res: Response, next: NextFunction) => {
  const user = req.userInfo;
  if (!user) return res.status(401).json({ message: "Não autorizado" });
  if (user.role !== "admin") return res.status(403).json({ message: "Acesso restrito a administradores" });
  next();
};

// listar todos os usuários
router.get("/", authMiddleware, UserController.getAll.bind(UserController));

// buscar 1 usuário pelo id — usuário autenticado (ou admin)
router.get("/:id", UserController.getById.bind(UserController));

// criar usuário — deixei pública (pode ser usada na tela de cadastro)
// se quiser tornar só admin, adicione authMiddleware + requireAdmin aqui
router.post("/", UserController.create.bind(UserController));

// atualizar usuário — autenticado (o próprio usuário ou admin deveria poder — lógica extra pode ser implementada no service/controller)
router.put("/:id", authMiddleware, UserController.update.bind(UserController));

// deletar usuário — só admin
router.delete("/:id", authMiddleware, requireAdmin, UserController.delete.bind(UserController));

export default router;
