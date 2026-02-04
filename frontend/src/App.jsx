import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./pages/MainLayout";
import { ProtectAdminRoute } from "./component/ProtectAdminRoute";


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
