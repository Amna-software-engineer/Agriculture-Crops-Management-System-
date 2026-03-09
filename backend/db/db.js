import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const mongodb_URL = process.env.mongodb_URL;


export const ConnectDb = async () => {
    try {
        const connection = await mongoose.connect(
            mongodb_URL,
        );

        if (connection.connection) {
            console.log("Database Connected Successfully!");
        }
    } catch (error) {
        console.log("Something went wronge while connecting DB");
    }
};
