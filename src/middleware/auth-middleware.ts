import { NextFunction, Request, Response } from "express";

import  jwt, { decode }  from "jsonwebtoken";

const authMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    try{
        const bearerToken = req.headers['authorization'];
        
        const token = bearerToken && bearerToken.split(" ")[1];

        if(!token){
            throw new Error('Autenticação precisa ser fornecida!');
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY as string);

        if(!decodedToken){
            throw new Error("Autenticação invalida");
        }

        req.userInfo = decodedToken;

        next();
        
    }catch(error){
        next(error);
    }
}

export default authMiddleware;