import { Router } from "express";
import {deleteCrops, editCrop, getCrops, postCrops} from "../controller/crops.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/crops",verifyToken,getCrops);
router.post("/crops",verifyToken,postCrops);
router.delete("/crops/:id",verifyToken,deleteCrops);
router.patch("/crops/:id",verifyToken,editCrop);

export default router;