import { useState } from "react"
import { BaseApi } from "./base.api";
import { CropEndPoints, OrderEndPoints } from "./endpoints";
import { toast } from "react-toastify";


export const useGetAllOrders = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // function to get crops
    const getOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.get(OrderEndPoints.order); 
            if (response) {
                const orderList = response.data.allOrders;
                localStorage.setItem("orderList",JSON.stringify(orderList));
                return orderList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Order Featching failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, getOrders }
}