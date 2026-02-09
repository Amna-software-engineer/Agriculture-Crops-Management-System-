import { useState } from "react"
import { BaseApi } from "./base.api";
import { CropEndPoints, OrderEndPoints } from "./endpoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeOrderFromStore, setOrder } from "../features/order.slice";
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
                localStorage.setItem("orderList", JSON.stringify(orderList));
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

// custome hook to add a order 
export const useAddOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orders.orders);

    // function to edit User
    const addOrder = async (orderData) => {
        console.log("orderData", orderData);
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.post(OrderEndPoints.order, orderData);
            if (response.data) {
                console.log("response.data", response.data);

                let newOrder = response.data.newOrder;
                let updatedList = [...orderList, newOrder];

                // updating the store to update UI
                dispatch(setOrder(updatedList));
                toast.success("Order Added Successfully.");
                return updatedList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Order Adding failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, addOrder }
}

// custome hook to edit a crop stuts from backend
export const useEditOrderStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orders.orders);

    // function to edit order status
    const editStatus = async ({ status }, id) => {
        console.log("id", id);
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.patch(OrderEndPoints.editOrderStuts(id), { status });
            if (response.data) {
                console.log("response.data", response.data);

                let updatedOrder = response.data.updatedOrder;
                let updatedList = orderList.map(order => {
                    if (order._id === id) {
                        return { ...order, status: status }
                    }
                    return order;
                });

                // updating the store to update UI
                dispatch(setOrder(updatedList));
                toast.success("Order Status Updated Successfully.");
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

// custome hook to delete order from backend
export const useDeleteOrder = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const orderList = useSelector(state => state.orders.orders);

    // function to delete Order
    const deleteOrder = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.delete(OrderEndPoints.deleteOrder(id));
            console.log("deleted response ", response);

            if (response.data) {
                const updatedList = orderList.filter(order => order._id !== id);
                toast.success("Order Deleted Successfully.");
                dispatch(removeOrderFromStore(id));
                return updatedList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Order deleting failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, deleteOrder }
}