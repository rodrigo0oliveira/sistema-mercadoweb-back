import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./src/routes/auth/auth.routes";

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(authRouter);

export default app;