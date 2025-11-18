import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use((request:Request,response:Response,next:NextFunction)=>{
    response.send("Success");
})

export default app;