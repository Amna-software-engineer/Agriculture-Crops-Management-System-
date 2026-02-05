import { useState } from "react"
import { BaseApi } from "./base.api";
import { CropEndPoints } from "./endpoints";
import { toast } from "react-toastify";


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