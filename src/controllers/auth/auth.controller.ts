import { NextFunction, Request, Response } from "express";
import User from "../../models/user";


const register = (req:Request,res:Response,next:NextFunction) => {
    try{
    const {cpf,email,password,idade} = req.body;
    const newUser = new User({email,cpf,password,idade});

    newUser.save()
    .then((user)=>{
    res.status(201).json({message:"User created successfully",data:{
        email:user.email,
        id:user.id
    }})
    })
    .catch((err)=>{
    res.status(400).json({message:err.message})
    });

    }catch(err:any){
        throw new Error(err.message)
    }
}


export {
    register
};