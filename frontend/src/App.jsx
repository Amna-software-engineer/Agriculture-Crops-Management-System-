import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MainLayout from "./pages/MainLayout";
import { ProtectAdminRoute, ProtectClientRoute, ProtectFarmerRoute } from "./component/ProtectRoute";
import UserManagement from "./pages/admin/UserManagement";
import SystemCrops from "./pages/admin/SystemCrops";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import FarmerCrops from "./pages/farmer/FarmerCrops";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import ClientMarketPlace from "./pages/client/ClientMarketPlace";
import ClientMyOrder from "./pages/client/ClientMyOrder";



const router = createBrowserRouter([
    // admin routes
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
    // farmer routes
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/dashboard/farmer",
                element: <ProtectFarmerRoute> <FarmerDashboard /></ProtectFarmerRoute>,
            },
            {
                path: "/dashboard/farmer/my-crops",
                element: <ProtectFarmerRoute> <FarmerCrops /></ProtectFarmerRoute>,
            },
            {
                path: "/dashboard/farmer/orders",
                element: <ProtectFarmerRoute> <FarmerOrders /></ProtectFarmerRoute>,
            },
        ]
    },
    // client
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/dashboard/client",
                element: <ProtectClientRoute> <ClientMarketPlace /></ProtectClientRoute>,
            },
            {
                path: "/dashboard/client/my-orders",
                element: <ProtectClientRoute> <ClientMyOrder /></ProtectClientRoute>,
            },
           
        ]
    },

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
