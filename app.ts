import express from "express";
import cors from "cors";


import authRouter from "./src/routes/auth/auth.routes";
import testRouter from "./src/routes/test/test.route";
import productRouter from "./src/routes/products/products.routes";
import userRouter from "./src/routes/user/user.routes";
import saleRoutes from "./src/routes/sale/sale.routes";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/test", testRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/sales", saleRoutes);

export default app;