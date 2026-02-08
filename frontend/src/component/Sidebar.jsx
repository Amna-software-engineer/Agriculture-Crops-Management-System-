import React, { use } from 'react';
import { LayoutDashboard, Users, Leaf, LogOut, Menu, X, Package, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminSidebar = () => {
  const [show, setShow] = React.useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  // function to handle logout
  const handleLogout = () => {
    localStorage.clear()
    navigate("/login");
  }
  const user = useSelector(state => state.auth.currUser);
  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden p-4 bg-[#0f172a] text-white flex justify-between items-center fixed top-0 w-full z-50">
        <h1 className="font-bold">AgriManage</h1>
        <button onClick={() => setShow(!show)}>
          {show ? <X /> : <Menu />}
        </button>
      </div>
      <div className={` ${show ? "flex" : "hidden"} lg:flex fixed lg:static top-0 left-0 z-100 w-64 h-screen bg-[#0f172a] text-gray-400 flex flex-col p-4 `}>
        {/* Brand Logo Section */}
        <div className="flex items-center gap-3 px-2 mb-10 mt-2">
          <div className="bg-emerald-500 p-1.5 rounded-lg">
            <Leaf className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight">AgriManage</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{user?.role?.toUpperCase()} Panel</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {/* --- DASHBOARD / MARKETPLACE LINK --- */}
          <Link
            to={
              (user?.role === "admin" && "/dashboard/admin") ||
              (user?.role === "farmer" && "/dashboard/farmer") ||
              (user?.role === "client" && "/dashboard/client")
            }
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/dashboard/admin') || isActive('/dashboard/farmer') || isActive('/dashboard/client') === true && !window.location.pathname.includes('orders')
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                : 'hover:bg-gray-800 hover:text-gray-200'
              }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">
              {user?.role === "client" ? "Marketplace" : "Dashboard"}
            </span>
          </Link>

          {/* --- SECOND LINK: User Management (Admin) / My Crops (Farmer) / My Orders (Client) --- */}
          <Link
            to={
              (user?.role === "admin" && "/dashboard/admin/user-managment") ||
              (user?.role === "farmer" && "/dashboard/farmer/my-crops") ||
              (user?.role === "client" && "/dashboard/client/my-orders")
            }
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/dashboard/admin/user-managment') || isActive('/dashboard/farmer/my-crops') || isActive('/dashboard/client/my-orders')
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                : 'hover:bg-gray-800 hover:text-gray-200'
              }`}
          >
            {user?.role === "admin" ? <Users size={20} /> : user?.role === "client" ? <Package size={20} /> : <Leaf size={20} />}
            <span className="font-medium">
              {(user?.role === "admin" && "User Management") ||
                (user?.role === "farmer" && "My Crops") ||
                (user?.role === "client" && "My Orders")}
            </span>
          </Link>

          {/* --- THIRD LINK: System Crops (Admin) / Orders (Farmer) / Profile & Settings (Client) --- */}
          <Link
            to={
              (user?.role === "admin" && "/dashboard/admin/system-crops") ||
              (user?.role === "farmer" && "/dashboard/farmer/orders") 
            }
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive('/dashboard/admin/system-crops') || isActive('/dashboard/farmer/orders') }
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                : 'hover:bg-gray-800 hover:text-gray-200'
              }`}
          >
            {user?.role !== "client" && <Leaf size={20} />} 
            <span className="font-medium">
              {(user?.role === "admin" && "System Crops") ||
                (user?.role === "farmer" && "Orders") }
            </span>
          </Link>
        </nav>

        {/* Logout Button at Bottom */}
        <div className="border-t border-gray-800 pt-4 mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-900/20 hover:text-red-400 transition-all text-gray-400" onClick={handleLogout}>
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar