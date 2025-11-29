import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY || "secret";

const authMiddleware = (req: Request & { userInfo?: any }, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers["authorization"] as string | undefined;
    if (!bearerToken) return res.status(401).json({ message: "Token não fornecido" });

    const parts = bearerToken.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Token malformatado" });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (!decoded) return res.status(401).json({ message: "Token inválido" });

    req.userInfo = decoded; // popula req.userInfo com id/email/role
    return next();
  } catch (error: any) {
    return res.status(401).json({ message: error.message || "Erro de autenticação" });
  }
};

export default authMiddleware;
