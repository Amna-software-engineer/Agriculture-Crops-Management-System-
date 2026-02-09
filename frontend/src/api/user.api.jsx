import { useState } from "react"
import { BaseApi } from "./base.api";
import { AuthEndPoints, CropEndPoints, UserEndPoints } from "./endpoints";
import { toast } from "react-toastify";
import { setUser } from "../features/user.slice";
import { useDispatch, useSelector } from "react-redux";

// custome hook to get user from backend
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
                localStorage.setItem("userList", JSON.stringify(userList));
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
// custome hook to edit a user from backend
export const useEditlUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const userList = useSelector(state => state.users.Users);

    // function to edit User
    const editUser = async (id, formData) => {
        console.log("id", id);
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.patch(UserEndPoints.editUser(id), formData);
            if (response.data) {
                const updatedUser = response.data.updatedUser;
                const updatedList = userList.map(user => {
                    if (user._id === id) {
                        return { ...user, ...formData, ...updatedUser }
                    }
                    return user;
                });

                // updating the store to update UI
                dispatch(setUser(updatedList));
                toast.success("User Updated Successfully.");
                return updatedList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "User updating failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, editUser }
}
// custome hook to add new user from backend
export const useAddUser = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userList = useSelector(state => state.users.Users);

    // function to add User
    const addUser = async ({ name, email, password, role, status }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.post(AuthEndPoints.register, {
                name,
                email,
                password,
                role,
                status
            });
            if (response.data) {
                const newUser = response.data.newUser;
                const updatedList = [...userList, newUser];

                // updating the state to update UI
                dispatch(setUser(updatedList));
                toast.success("User Added Successfully.");
                return updatedList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "User adding failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, addUser }
}
// custome hook to delete user from backend
export const useDeleteUser = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
    const userList = useSelector(state => state.users.Users);

    // function to delete User
    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.delete(UserEndPoints.deleteUser(id));
            console.log("deleted response ", response);

            if (response.data) {
                const updatedList = userList.filter(user => user._id !== id);
                toast.success("User Deleted Successfully.");
                dispatch(setUser(updatedList));
                return updatedList;
            }
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "User upadeting failed";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, deleteUser }
}