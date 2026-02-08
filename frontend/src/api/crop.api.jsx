import { useState } from "react"
import { BaseApi } from "./base.api";
import { CropEndPoints } from "./endpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
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
                localStorage.setItem("cropsList", JSON.stringify(cropsList));
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

// custome hook to edit a crop stuts from backend
export const useEditCropStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const cropsList = useSelector(state => state.crops.crops);

    // function to edit User
    const editStatus = async (id, { status }) => {
        console.log("id", id);
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.patch(CropEndPoints.editCropStuts(id), { status });

            if (response.data) {
                let updatedCrop = response.data?.updatedCrop;
                let updatedList = cropsList.map(crop => {
                    if (crop._id === id) {
                        return { ...crop, status: status }
                    }
                    return crop;
                });

                // updatong the store to update UI
                dispatch(setCrops(updatedList));
                toast.success("Crop Status Updated Successfully.");
                return updatedCrop;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Crop updating failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, editStatus }
}
// custome hook to edit a crop from backend
export const useEditCrop = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const cropsList = useSelector(state => state.crops.crops);

    // function to edit User
    const editCrop = async (id, { name, cropType, quantity, price, location, status }) => {
        console.log("id", id);
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.patch(CropEndPoints.editCrop(id), { name, cropType, quantity, price, location, status });
            console.log("response", response);

            if (response.data) {
                let updatedCrop = response.data.updatedCrop;
                let updatedList = cropsList.map(crop =>
                    crop._id === id ? { ...crop, name, cropType, quantity, price, location, status } : crop
                );

                // updatong the store to update UI
                dispatch(setCrops(updatedList));
                toast.success("Crop Updated Successfully.");
                return updatedCrop;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Crop updating failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, editCrop }
}
// custome hook to add a crop from backend
export const useAddCrop = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const cropsList = useSelector(state => state.crops.crops);

    // function to add User
    const addCrop = async ({ name, cropType, quantity, price, location, status, farmerId }) => {
        setLoading(true);
        setError(null);
        console.log("Add Crop.api ", { name, cropType, quantity, price, location, status, farmerId });

        try {
            const response = await BaseApi.post(CropEndPoints.crop, { name, cropType, quantity, price, location, status, farmerId });
            console.log("response", response);

            if (response.data) {
                let newCrop = response.data.newCrop;
                let updatedList = [...cropsList, newCrop];

                // updatong the store to update UI
                dispatch(setCrops(updatedList));
                toast.success("Crop Added Successfully.");
                return newCrop;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Crop adding failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, addCrop }
}

// custome hook to delete crop from backend
export const useDeleteCrop = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch();
    const cropsList = useSelector(state => state.crops.crops);

    // function to delete crop
    const deleteCrop = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.delete(CropEndPoints.deleteCrop(id));
            console.log("deleted response ", response);

            if (response.data) {
                let updatedList = cropsList.filter(crop => crop._id !== id);
                toast.success("Crop Deleted Successfully.");
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
    return { loading, error, deleteCrop }
}