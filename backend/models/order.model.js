import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
   items: [{
        crop: { type: mongoose.Schema.Types.ObjectId, ref: "CropModel" },
        quantity: { type: Number, required: true }
    }]
    ,
    // quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending",
    },
    shippingAddress: {
        address: String,
        city: String,
        phone: String
    }
}, { timestamps: true })

const model = mongoose.model("orderModel", orderSchema);
export default model;