import mongoose from "mongoose";

export const ConnectDb = async () => {
    try {
        const connection = await mongoose.connect(
            "mongodb://localhost:27017/agri-manage",
        );

        if (connection.connection) {
            console.log("Database Connected Successfully!");
        }
    } catch (error) {
        console.log("Something went wronge while connecting DB");
    }
};
