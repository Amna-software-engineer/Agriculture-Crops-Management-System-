import { jwtDecode } from 'jwt-decode';
import { ShoppingCart } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';

const DashboardHeader = ({ page, role,onCartClick }) => {

  const user = useSelector(state => state.auth.currUser);
  const cartItems = useSelector(state => state.cart.items);

  return (
    //    {/* Header Section */}
    <div className="flex justify-between items-center mt-10 lg:mt-0">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{page}</h1>
        <p className="text-gray-500">Welcome back, {user?.name}</p>
      </div>

      <div className='flex items-center justify-center gap-5'>
        {/* prfoile info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:inline-block">
            <p className="font-bold text-gray-800">{role}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
            {user?.name?.slice(0, 2).toUpperCase()}
          </div>
        </div>
        {/* CART ICON:  Client role */}
        {role?.toLowerCase() === 'client' && (
          <div className="relative p-2.5 bg-white border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all shadow-sm group" onClick={onCartClick}>
            <ShoppingCart size={22} className="text-gray-600 group-hover:text-emerald-600" />
            
            {/* Static Badge */}
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartItems?.length || 0}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardHeader