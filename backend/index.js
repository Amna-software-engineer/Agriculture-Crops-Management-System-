import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import AuthRouter from "./router/auth.router.js";
import { ConnectDb } from "./db/db.js";

const PORT = 3000;

const app = express();
dotenv.config();

app.use(express.json());
app.use(
    cors({
        origin: "*", //for all origins
    }),
);

app.use("/api/auth", AuthRouter);

app.listen(PORT, async () => {
    console.log(`Server is listing on PORT=${PORT}`);
    await ConnectDb();
});
