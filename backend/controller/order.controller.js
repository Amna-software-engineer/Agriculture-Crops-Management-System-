import Order from "../models/order.model.js";


export const postOrder = async (req, res) => {
    try {
        const { buyer, crop, quantity, totalPrice, status, shippingAddress } = req.body;
        if (!buyer || !crop || !quantity || !totalPrice || !status || !shippingAddress) {
            return res.status(401).json({
                success: false,
                message: "Please provide all the fields",
            });
        }
        const newOrder = await Order.create({ buyer, crop, quantity, totalPrice, status, shippingAddress });
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
    try {
        const allOrders = await Order.find();
        console.log("allorders ",allOrders);
        
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