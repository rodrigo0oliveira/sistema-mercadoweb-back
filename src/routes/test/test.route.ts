import express, { Request, Response } from "express";
import authMiddleware from "../../middleware/auth-middleware";
import authorizeRoles from "../../middleware/authorize-roles";
const testRouter = express.Router();

testRouter.get("/public",(req:Request,res:Response)=>{
    res.status(200).json({message:"Rota pública acessada com sucesso!"});
});

testRouter.get(
    "/private-admin",
    authMiddleware,
    authorizeRoles(["admin"]), (req:Request,res:Response)=>{
        res.status(200).json({message:"Rota de admin"})
    }
);

testRouter.get(
    "/private-funcionario",
    authMiddleware,
    authorizeRoles(["funcionario"]),
    (req:Request,res:Response)=>{
        res.status(200).json({message:"Rota de funcionário"})
    }
);

export default testRouter;
