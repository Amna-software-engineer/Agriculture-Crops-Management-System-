import { Router } from "express";
import { cancelOrder, editOrder, getOrders, getUserOrder, postOrder } from "../controller/order.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/order",verifyToken,postOrder);
router.get("/order",verifyToken,getOrders);
router.get("/order/:userId",verifyToken,getUserOrder);
router.delete("/order/:orderId",verifyToken,cancelOrder);
router.patch("/order/:orderId",verifyToken,editOrder);


export default router;