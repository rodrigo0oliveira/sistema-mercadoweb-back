import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRouter from "./src/routes/auth/auth.routes";
import testRouter from "./src/routes/test/test.route";
import productRouter from "./src/routes/products/products.routes"

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(authRouter);
app.use(testRouter);
app.use("/products", productRouter);

export default app;