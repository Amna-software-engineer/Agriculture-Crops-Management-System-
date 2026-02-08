import Order from "../models/order.model.js";
import User from "../models/auth.model.js";
import Crops from "../models/crop.model.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "someaccesssecret";

export const postOrder = async (req, res) => {
    console.log("req.body ", req.body);

    try {
        let { buyer, items, totalPrice, shippingAddress } = req.body;
        if (!buyer || !items || !totalPrice || !shippingAddress) {
            return res.status(401).json({
                success: false,
                message: "Please provide all the fields",
            });
        }
        const newOrder = await Order.create({ buyer, items, totalPrice, shippingAddress });
        res.status(201).json({ success: true, message: "Order Added Succesfuly", newOrder });

    } catch (error) {
        console.log("Error in Order Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}



export const getOrders = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    console.log("decoded ", decoded);

    try {
        let allOrders = [];
        if (decoded.role == "admin") {
            allOrders = await Order.find().populate("buyer", "name").populate("items.crop", "name");

        } else if (decoded.role == "farmer") {
            // 1. Find all crops belonging to this farmer
            const farmerCrops = await Crops.find({ farmerId: decoded._id }).select("_id");
            const cropIds = farmerCrops.map(c => c._id);

            // 2. Find orders that contain any of these crops
            allOrders = await Order.find({ "items.crop": { $in: cropIds } })
                .populate("buyer", "name")
                .populate("items.crop", "name farmerId");

            // Note: In a real system, we might want to filter the 'items' array 
            // to ONLY show crops belonging to this farmer if an order contains crops from multiple farmers.
            // For now, returning the whole order if it contains at least one of their crops.

        } else if (decoded.role == "client") {
            allOrders = await Order.find({ buyer: decoded._id }).populate("buyer", "name").populate("items.crop", "name");
        }
        console.log("allorders ", allOrders);

        res.status(200).json({ success: true, message: "Orders featched Succesfuly", allOrders });
    } catch (error) {
        console.log("Error in Order Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const getUserOrder = async (req, res) => {
    const id = req.params.userId;
    console.log("id", id);
    try {
        // populate("firledOfOrderSchema","nameOfFildsYouWantToPaopulate") here we are populated buyer(which is ID) with only name field
        const singleUserOrder = await Order.findOne({ buyer: id }).populate("buyer", "name").populate("crop", "name");
        console.log("singleCrop", singleUserOrder);
        res.status(200).json({ success: true, message: "Order featched Succesfuly", singleUserOrder });
    } catch (error) {
        console.log("Error in Order Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const cancelOrder = async (req, res) => {
    const id = req.params.orderId;
    try {
        const cancelledOrder = await Order.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Order Cancelled Succesfuly", cancelledOrder });
    } catch (error) {
        console.log("Error in Order Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const editOrder = async (req, res) => {
    const id = req.params.orderId;
    const { buyer, crop, quantity, totalPrice, status, shippingAddress } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { buyer, crop, quantity, totalPrice, status, shippingAddress });
        res.status(200).json({ success: true, message: "Order updated Succesfuly", updatedOrder });
    } catch (error) {
        console.log("Error in Order Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const editOrderStatus = async (req, res) => {
    const id = req.params.orderId;
    const { status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { status: status });
        res.status(200).json({ success: true, message: "Order status updated Succesfuly", updatedOrder });
    } catch (error) {
        console.log("Error in Order Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}