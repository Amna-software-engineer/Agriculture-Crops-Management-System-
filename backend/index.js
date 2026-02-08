import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import AuthRouter from "./router/auth.router.js";
import { ConnectDb } from "./db/db.js";

import cropRouter from "./router/crop.router.js"
import userRouter from "./router/user.router.js"
import orderRouter from "./router/order.router.js"
import cartRouter from "./router/cart.router.js"
const PORT = 3000;

dotenv.config();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    }),
);

app.use("/api/auth", AuthRouter);
app.use("/api",cropRouter);
app.use("/api",userRouter);
app.use("/api",orderRouter);
app.use("/api",cartRouter);


app.listen(PORT, async () => {
    console.log(`Server is listing on PORT=${PORT}`);
    await ConnectDb();
});
