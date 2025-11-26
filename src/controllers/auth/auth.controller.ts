import { NextFunction, Request, Response } from "express";
import { createToken, createUser, isPasswordMatch, verifyEmailAndPassword, verifyIfEmailExists } from "../../services/auth/auth.service";



const register = async (req:Request,res:Response,next:NextFunction) => {
    try{
    const {name,cpf,email,password,age} = req.body;
    
    const newUser = await createUser(name,cpf,password,email,age);
    
    return res.status(201).send({message:"Usuário criado com sucesso!",userInfo:{
        id:newUser.id
    }});
    

    }catch(err:any){
        throw new Error(err.message)
    }
}


const login = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const {email,password} = req.body;

        const emailExists = await verifyIfEmailExists(email);
        const matchPassword = await isPasswordMatch(email,password);

        verifyEmailAndPassword(emailExists,matchPassword);

        const token = await createToken(email);

        res.status(200).json({
            message:'Login realizado com sucesso',
            acessToken:token
        });
        
    } catch (error:any) {
        throw new Error(error.message);
    }
}


export {
    register,
    login
};