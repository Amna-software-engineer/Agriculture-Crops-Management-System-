import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    items: [
        {
            crop: { type: mongoose.Schema.Types.ObjectId, ref: "CropModel", required: true },
            cartQty: { type: Number, required: true, default: 1 }
        }
    ]
}, { timestamps: true });

const model = mongoose.model("cartModel", cartSchema);
export default model;