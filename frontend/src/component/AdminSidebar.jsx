import React from 'react';
import { LayoutDashboard, Users, Leaf, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  // function to handle logout
  const handleLogout =()=>{
    localStorage.removeItem("accessToken");
    navigate("/login");
  }
  return (
    <div className="w-64 h-screen bg-[#0f172a] text-gray-400 flex flex-col p-4">
      {/* Brand Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-10 mt-2">
        <div className="bg-emerald-500 p-1.5 rounded-lg">
          <Leaf className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-white font-bold text-xl tracking-tight">AgriManage</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Admin Panel</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        <Link
          to="/dashboard/admin"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive('/dashboard/admin') 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
              : 'hover:bg-gray-800 hover:text-gray-200'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link
          to="/dashboard/admin/user-managment"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive('/dashboard/admin/user-managment') 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
              : 'hover:bg-gray-800 hover:text-gray-200'
          }`}
        >
          <Users size={20} />
          <span className="font-medium">User Management</span>
        </Link>

        <Link
          to="/dashboard/admin/system-crops"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive('/dashboard/admin/system-crops') 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
              : 'hover:bg-gray-800 hover:text-gray-200'
          }`}
        >
          <Leaf size={20} />
          <span className="font-medium">System Crops</span>
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
  );
}

export default AdminSidebar