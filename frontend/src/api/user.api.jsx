import { useState } from "react"
import { BaseApi } from "./base.api";
import { CropEndPoints, UserEndPoints } from "./endpoints";
import { toast } from "react-toastify";


export const useGetAllUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // function to get User
    const getUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.get(UserEndPoints.user);           
            if (response) {
                const userList = response.data.allUsers;
                localStorage.setItem("userList",userList);
                return userList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "User Fetaching failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, getUsers }
}