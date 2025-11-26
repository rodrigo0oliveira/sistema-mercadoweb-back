import { NextFunction, Request, Response } from "express";
import { Role } from "../core/role.type";

function authorizeRoles(allowedRoles:Role []){
    return (req:Request,res:Response,next:NextFunction)=>{
        try{
            if(!req.userInfo){
                throw new Error("Autenticação não fornecida!")
            }

            console.log(allowedRoles);
            

            if(!allowedRoles.includes(req.userInfo.role)){
                return res.status(401).json({message:"Acesso negado! Você não tem permissão para acessar este recurso."});
            }
            
            next();
        }catch(error:any){
            return res.status(401).json({message: error.message});
        }
    }
}

export default authorizeRoles;