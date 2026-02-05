import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MainLayout from "./pages/MainLayout";
import { ProtectAdminRoute } from "./component/admin/ProtectAdminRoute";
import UserManagement from "./pages/admin/UserManagement";
import SystemCrops from "./pages/admin/SystemCrops";
import EditUser from "./component/admin/EditUserModal";


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
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

export default router;
