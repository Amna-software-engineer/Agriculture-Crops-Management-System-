import axios from "axios";
 const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
export const BaseApi = axios.create({
    baseURL: isLocalhost ? "http://localhost:3000/api" : "https://agriculture-crops-management-system.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});



// const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
// export const baseApi=axios.create({
//     baseURL: isLocalhost ? "http://localhost:5000/api" : "https://online-college-assets-management-sy.vercel.app/api",
//     headers: {
//         "Content-Type": "application/json",
//     }
// })

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
