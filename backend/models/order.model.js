import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    buyer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "UserModel", 
        required: true 
    },
    crop: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "CropModel", 
        required: true 
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ["pending", "shipped", "delivered"], 
        required: true 
    },
    shippingAddress: { type: String, required: true }
},{timestamps:true})

const model = mongoose.model("orderModel",orderSchema);
export default model;