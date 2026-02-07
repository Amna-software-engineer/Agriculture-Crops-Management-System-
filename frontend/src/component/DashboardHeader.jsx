import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useSelector } from 'react-redux';

const DashboardHeader = ({page,role}) => {

  const user=useSelector(state=>state.auth.currUser);

  return (
    //    {/* Header Section */}
      <div className="flex justify-between items-center"> 
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{page}</h1>
          <p className="text-gray-500">Welcome back, {user?.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-gray-800">{role}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
            {user?.name?.slice(0,2).toUpperCase()}
          </div>
        </div>
      </div>
  )
}

export default DashboardHeader