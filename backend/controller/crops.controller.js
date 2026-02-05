import User from "../models/auth.model.js"
import Crops from "../models/crop.model.js"

export const postCrops = async (req, res) => {
    try {
        const { name, cropType, quantity, price, location, status, formerId, imgURL } = req.body;
        if (!name || !cropType || !quantity || !price || !location || !status || !formerId || !imgURL) {
            return res.status(401).json({
                success: false,
                message: "Please provide all the fields",
            });
        }
        const newCrop = await Crops.create({ name, cropType, quantity, price, location, status, formerId, imgURL });
        res.status(201).json({ success: true, message: "Crop Added Succesfuly", newCrop });

    } catch (error) {
        console.log("Error in Crops Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const getCrops = async (req, res) => {
    try {
        const allCrops = await Crops.find().populate("formerId","name");
        res.status(200).json({ success: true, message: "Crops featched Succesfuly", allCrops });
    } catch (error) {
        console.log("Error in Crops Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const getSingleCrop = async (req, res) => {
    const id = req.params.id;
    try {
        const singleCrop = await Crops.findOne({id}).populate("formerId","name");
        if(singleCrop){
            return res.status(200).json({ success: true, message: "Crop featched Succesfuly", singleCrop });
        }else{
            return res.status(404).json({ 
            success: false, 
            message: "Crop not found in database" 
        });
        }
    } catch (error) {
        console.log("Error in Crops Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const deleteCrops = async (req, res) => {
    const id = req.params.id;
    console.log("id ",id);
    
    try {
    const deletedCrop = await Crops.findOneAndDelete({ _id:id });
    console.log("deleteCrops ",deletedCrop);
        if (deletedCrop !== null) {
            res.status(200).json({ success: true, message: "Crop deleted Succesfuly", deletedCrop });  
        }else{
             res.status(404).json({ success: false, message: "Crop Not Found" });  
        }
    } catch (error) {
        console.log("Error in Crops Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const editCrop = async (req, res) => {
    const id = req.params.id;
    const { name, cropType, quantity, price, location, status, formerId, imgURL } = req.body;
    try {
        const updatedCrop = await Crops.findByIdAndUpdate(id, { name, cropType, quantity, price, location, status, formerId, imgURL });
        res.status(200).json({ success: true, message: "Crops updated Succesfuly", updatedCrop });
    } catch (error) {
        console.log("Error in Crops Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const editCropStatus = async (req, res) => {
    const id = req.params.id;
    const { status} = req.body;
    try {
        const updatedCrop = await Crops.findByIdAndUpdate(id, {status:status});
        console.log("updatedCrop ", updatedCrop);
        res.status(200).json({ success: true, message: "Crops updated Succesfuly", updatedCrop });
    } catch (error) {
        console.log("Error in Crops Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}