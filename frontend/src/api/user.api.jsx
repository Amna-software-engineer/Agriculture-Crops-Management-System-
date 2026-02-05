import { useState } from "react"
import { BaseApi } from "./base.api";
import { AuthEndPoints, CropEndPoints, UserEndPoints } from "./endpoints";
import { toast } from "react-toastify";
import { setUser } from "../features/user.slice";
import { useDispatch } from "react-redux";

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
    const dispatch =useDispatch();

    // function to edit User
    const editUser = async (id, formData) => {
        console.log("id", id);

        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.patch(UserEndPoints.editUser(id), formData);
            console.log("response ", response);

            if (response) {

                let updatedUser = response.data.updatedUser;
                let userList = JSON.parse(localStorage.getItem("userList"));
                let updatedList = userList.map(user => {
                    if (user._id == updatedUser._id) {
                        return { ...user, name: updatedUser.name, role: updatedUser.role, status: updatedUser.status }
                    }
                    return user;
                });
                console.log("updated user ", updatedUser);
                // updatong the store to update UI
                   dispatch(setUser(updatedList));
                toast.success("User Updated succesfully.");
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
    return { loading, error, editUser }
}
// custome hook to add new user from backend
export const useAddUser = () => {
        const dispatch =useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // function to add User
    const addUser = async ({ name, email, password, role, status}) => {
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
            if (response) {
                let newUser = response.data.newUser;
                let userList = JSON.parse(localStorage.getItem("userList"));
                let updatedList = [...userList,newUser];
                    return updatedList;
                };
                // updatong the state to update UI
                   dispatch(setUser(updatedList));
                toast.success("User Added succesfully.");
                return updatedList;
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "User upadeting failed";
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
    const dispatch =useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // function to add User
    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await BaseApi.delete(UserEndPoints.deleteUser(id));
            console.log("deleted response ", response);

            if (response) {
                let deletedUser = response.data.deletedUser;
              let userList = JSON.parse(localStorage.getItem("userList"));
                let updatedList = userList.filter(user => user._id !== deletedUser._id);
                toast.success("User Deleted succesfully.");
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