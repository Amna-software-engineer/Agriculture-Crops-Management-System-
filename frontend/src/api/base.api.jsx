import axios from "axios";

export const BaseApi = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

BaseApi.interceptors.request.use(
    (request) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }
        return request;
    },
    (error) => Promise.reject(error),
);
