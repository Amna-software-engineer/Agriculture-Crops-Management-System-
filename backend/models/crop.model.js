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
        enum: ["Pending", "Live", "Rejected", "Sold Out"],
        default: "Available",
        required: true
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    imgURL: { type: String },


}, { timestamps: true })

const model = mongoose.model("CropModel", cropSchema);
export default model;