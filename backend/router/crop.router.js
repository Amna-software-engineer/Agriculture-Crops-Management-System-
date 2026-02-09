import { Router } from "express";
import {deleteCrops, editCrop, editCropStatus, getCrops, postCrops} from "../controller/crops.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/crops",verifyToken,getCrops);
// router.get("/crops/:id",verifyToken,getSingleCrop);
router.post("/crops",verifyToken,postCrops);
router.delete("/crops/:id",verifyToken,deleteCrops);
router.patch("/crops/:id",verifyToken,editCrop);
router.patch("/crops/status/:id",verifyToken,editCropStatus);

export default router;