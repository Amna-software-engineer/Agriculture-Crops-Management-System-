
import { Router } from "express";
import {} from "../controller/crops.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js";
import { deleteUser, editUser, getSingleUser, getUser } from "../controller/user.controller.js";
import { Register } from "../controller/auth.controller.js";
const router = Router();

router.get("/user",verifyToken,getUser);
router.get("/user/:id",verifyToken,getSingleUser);
router.delete("/user/:id",verifyToken,deleteUser);
router.patch("/user/:id",verifyToken,editUser);
router.post("/user",verifyToken,Register);


export default router;