import { useState } from "react"
import { BaseApi } from "./base.api";
import { CropEndPoints } from "./endpoints";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCrops } from "../features/crops.slice";

// custome hook to get all crops from backend
export const useGetAllCrops = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // function to get crops
    const getCrops = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.get(CropEndPoints.crop);
            if (response) {
                const cropsList = response.data.allCrops;
                localStorage.setItem("cropsList",JSON.stringify(cropsList));
                return cropsList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Crop Fetaching failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, getCrops }
}

// custome hook to edit a crop from backend
export const useEditCropStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch =useDispatch();

    // function to edit User
    const editStatus = async (id, {status}) => {
        console.log("id", id);
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.patch(CropEndPoints.editCrop(id), {status});

            if (response.data) {
                let updatedCrop = response.data.updatedCrop;
                let cropList = JSON.parse(localStorage.getItem("cropsList"));
                let updatedList = cropList.map(crop => {
                    console.log(crop);
                    
                    if (crop._id === updatedCrop._id) {       
                        return { ...crop, status: updatedCrop.status }
                    }
                    return crop;
                });
               
                // updatong the store to update UI
                dispatch(setCrops(updatedList));
                toast.success("Crop Updated succesfully.");
                return updatedCrop;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Crop upadeting failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, editStatus }
}

// custome hook to delete user from backend
export const useDeleteCrop = () => {
    const dispatch =useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // function to add User
    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.delete(CropEndPoints.deleteCrop(id));
            console.log("deleted response ", response);

            if (response.data) {
                let deletedCrop = response.data.deletedCrop;
              let cropsList = JSON.parse(localStorage.getItem("cropsList"));
                let updatedList = cropsList.filter(crop => crop._id !== deletedCrop._id);
                toast.success("Crop Deleted succesfully.");
                dispatch(setCrops(updatedList));
                return updatedList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Crop Deletion failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, deleteUser }
}