import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MainLayout from "./pages/MainLayout";
import { ProtectAdminRoute, ProtectFormerRoute } from "./component/ProtectRoute";
import UserManagement from "./pages/admin/UserManagement";
import SystemCrops from "./pages/admin/SystemCrops";
import FormerDashboard from "./pages/former/FormerDashboard";
import FormerCrops from "./pages/former/FormerCrops";
import FormerOrders from "./pages/former/FormerOrders";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true, // (Home/Dashboard)
                element: <ProtectAdminRoute><AdminDashboard /></ProtectAdminRoute>,
            },
            {
                path: "/dashboard/admin",
                element: <ProtectAdminRoute><AdminDashboard /></ProtectAdminRoute>,
            },
            {
                path: "/dashboard/admin/user-managment",
                element: <ProtectAdminRoute><UserManagement /></ProtectAdminRoute>,
            },
            {
                path: "/dashboard/admin/system-crops",
                element: <ProtectAdminRoute><SystemCrops /></ProtectAdminRoute>,
            },

        ],
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/dashboard/former",
                element: <ProtectFormerRoute> <FormerDashboard /></ProtectFormerRoute>,
            },
            {
                path: "/dashboard/former/my-crops",
                element: <ProtectFormerRoute> <FormerCrops /></ProtectFormerRoute>,
            },
            {
                path: "/dashboard/former/orders",
                element: <ProtectFormerRoute> <FormerOrders /></ProtectFormerRoute>,
            },
        ]
    },
    ,
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

export default router;
