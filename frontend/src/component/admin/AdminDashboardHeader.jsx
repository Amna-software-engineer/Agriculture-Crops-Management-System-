import { jwtDecode } from 'jwt-decode';
import React from 'react'

const AdminDashboardHeader = ({page}) => {
    // console.log(props);
    
   const accessToken = localStorage.getItem('accessToken')
  const decoded = jwtDecode(accessToken);
  return (
    //    {/* Header Section */}
      <div className="flex justify-between items-center"> 
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{page}</h1>
          <p className="text-gray-500">Welcome back, {decoded?.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-gray-800">Administrator</p>
            <p className="text-xs text-gray-500">{decoded?.email}</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
            AD
          </div>
        </div>
      </div>
  )
}

export default AdminDashboardHeader