import { useState } from "react";
import { BaseApi } from "./base.api";
import { AuthEndPoints } from "./endpoints";
import { toast } from "react-toastify";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async ({ email, password }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await BaseApi.post(AuthEndPoints.login, {
                email,
                password,
            });

            if (response.data) {
                const accessToken = response.data.accesstoken;

                if (!accessToken) {
                    console.log("dev log: missing token");
                }

                localStorage.setItem("accessToken", accessToken);

                toast.success("Logged in succesfully.");
                return response.data;
            }
        } catch (err) {
            const message =
                err?.response?.data?.message || err?.message || "Login failed";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        loading,
        error,
    };
};

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async ({ name, email, password, role }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await BaseApi.post(AuthEndPoints.register, {
                name,
                email,
                password,
                role,
            });

            if (response.data) {
                toast.success("Registered successfully.");
                return response.data;
            }
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Registration failed";

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        loading,
        error,
    };
};
