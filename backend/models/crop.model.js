import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cropType: {
        type: String,
        required: true,
        enum: ["Grain", "Vegetable", "Fruit", "Fiber"]
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    status: {
        type: String,
        enum: ["Available", "Sold Out"],
        default: "Available",
        required: true
    },
    formerId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User", 
         required: true },
             imgURL: { type: String, required: true },


})

const model = mongoose.model("CropModel",cropSchema);
export default model;