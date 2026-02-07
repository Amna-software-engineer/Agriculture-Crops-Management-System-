import { useState } from "react"
import { BaseApi } from "./base.api";
import { CropEndPoints, OrderEndPoints } from "./endpoints";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setOrder } from "../features/order.slice";
// custome hook to get all order from backend
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

// custome hook to edit a crop stuts from backend
export const useEditOrderStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // function to edit User
    const editStatus = async ( { status },id) => {
        console.log("id", id);
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.patch(OrderEndPoints.editOrderStuts(id), { status });
            if (response.data) {
                console.log("response.data",response.data);
                
                let updatedOrder = response.data.updatedOrder;
                let orderList = JSON.parse(localStorage.getItem("orderList"));
                let updatedList = orderList.map(order => {
                    if (order._id === updatedOrder._id) {
                        console.log("order._id === updatedOrder._id");
                        return { ...order, status: updatedOrder.status }
                    }
                    console.log("order ",order);
                    
                    return order;
                });
                console.log("updatedList",updatedList,orderList);
                // updatong the store to update UI
                dispatch(setOrder(updatedList));
                toast.success("Order Updated succesfully.");
                return updatedList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Order Updating failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, editStatus }
}