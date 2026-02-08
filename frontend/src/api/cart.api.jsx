import { useDispatch } from "react-redux";
import { CartEndPoints } from "./endpoints";
import { useState } from "react";
import { toast } from "react-toastify";
import { BaseApi } from "./base.api";
import { setCartFromBackend } from "../features/cart.slice";

// custome hook to add new Item 
export const useAddItemToCart = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // function to add User
    const addItem = async ({ buyer, items }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.post(CartEndPoints.cart, { buyer, items });
            console.log("cart response ", response);

            if (response.data && response.data.items) {
                dispatch(setCartFromBackend(response.data.items));
                toast.success("Item Added succesfully.");
            };

            return response.data;
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Item adding failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, addItem }
}
// custome hook to edit  Item 
export const useEditItemInCart = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // function to add User
    const editItem = async ({ buyer, items }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.patch(CartEndPoints.editcart(buyer), { items });
            console.log("cart response ", response);

            if (response.data && response.data.items) {
                toast.success("Item Updated Successfully.");
                dispatch(setCartFromBackend(response.data.items));
            };

            return response.data;
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Item adding failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, editItem }
}
// custome hook to get Items 
export const useGetItemsFromCart = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // function to get cart items from backend
    const getItems = async ({ buyer }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.get(CartEndPoints.getcart(buyer));
            console.log("cart response ", response);

            if (response.data && response.data.items) {
                dispatch(setCartFromBackend(response.data.items));
            } else {
                dispatch(setCartFromBackend([]));
            }

            return response.data;
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Item fetching failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, getItems }
}

// custome hook to delete user from backend
export const useDeleteItem = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // function to add User
    const deleteItem = async (itemId) => {
        console.log(itemId);

        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.delete(CartEndPoints.deleteItem(itemId));
            console.log("deleted response ", response);

            if (response.data && response.data.items) {
                toast.success("Item Deleted succesfully.");
                dispatch(setCartFromBackend(response.data.items));
                return response.data.items;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Item upadeting failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, deleteItem }
}