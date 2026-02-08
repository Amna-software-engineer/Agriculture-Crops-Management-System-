import { Router } from "express";
import { addItem, deleteItem, getItems, editItem } from "../controller/cart.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/cart", verifyToken, addItem);
router.get("/cart/:id", verifyToken, getItems);
router.patch("/cart/:id", verifyToken, editItem);
router.delete("/cart/:itemId", verifyToken, deleteItem);


export default router;