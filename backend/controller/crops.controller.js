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
        res.status(501).json({ success: true, message: "Crop Added Succesfuly", newCrop });
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
        const allCrops = await Crops.find();
        res.status(200).json({ success: true, message: "Crops featched Succesfuly", allCrops });
    } catch (error) {
        console.log("Error in Crops Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const deleteCrops = async (req, res) => {
       const  id  = req.params.id;
    try {
        const deletedCrops = await Crops.findOneAndDelete({ id });
        res.status(200).json({ success: true, message: "Crops deleted Succesfuly", deletedCrops });
    } catch (error) {
        console.log("Error in Crops Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const editCrop = async (req, res) => {
    const  id  = req.params.id;
    const { name, cropType, quantity, price, location, status, formerId, imgURL } = req.body;

    try {
        const updatedCrop = await Crops.findByIdAndUpdate(id,{ name, cropType, quantity, price, location, status, formerId, imgURL });
        console.log("updatedCrop ",updatedCrop);
        res.status(200).json({ success: true, message: "Crops updated Succesfuly", updatedCrop });
    } catch (error) {
        console.log("Error in Crops Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}