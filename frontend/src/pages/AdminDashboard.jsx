"use client"
import React, { useEffect, useState } from 'react';
import { Users, Leaf, ShoppingBag } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useGetAllCrops } from '../api/crop.api';
import { useGetAllOrders } from '../api/order.api';
import { useGetAllUsers } from '../api/user.api';
import { setCrops } from '../features/crops.slice';
import { setOrder } from '../features/order.slice';
import { setUser } from '../features/user.slice';

const AdminDashboard = () => {
  const [cropList, setCropList] = useState([])
  const [orderList, setorderList] = useState([])
  const [userList, setUserList] = useState([])
  const dispatch = useDispatch();
  const { loading, Error, getCrops } = useGetAllCrops();
  const {  getOrders } = useGetAllOrders();
  const {  getUsers } = useGetAllUsers();
  useEffect(() => {
    (async () => {
      const crops = await getCrops()
      const orders = await getOrders()
      const users = await getUsers()
      setCropList(crops);
      setorderList(orders)
      setUserList(users)
    }
    )()

  }, [])

dispatch(setCrops(cropList))
dispatch(setOrder(orderList))
dispatch(setUser(userList))
  
  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-gray-800">Administrator</p>
            <p className="text-xs text-gray-500">admin@agrimanage.com</p>
          </div>
          <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
            AD
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Users</p>
            <h2 className="text-2xl font-bold text-gray-800">{userList?.length || 0 }</h2>
          </div>
        </div>

        {/* Total Crops Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl">
            <Leaf size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Crops</p>
            <h2 className="text-2xl font-bold text-gray-800">{cropList?.length || 0}</h2>
          </div>
        </div>

        {/* Active Orders Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-xl">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Orders</p>
            <h2 className="text-2xl font-bold text-gray-800">{orderList?.length || 0}</h2>
          </div>
        </div>
      </div>

      {/* Recent Activity Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="font-bold text-gray-800 text-lg">Recent System Activity</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4 text-center">User</th>
                <th className="px-6 py-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
              <tr>
                <td className="px-6 py-4">New Crop Added: <span className="text-emerald-600 font-medium">Organic Wheat</span></td>
                <td className="px-6 py-4 text-center">Farmer Zaid</td>
                <td className="px-6 py-4 text-right">2 mins ago</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-600">Order Completed</td>
                <td className="px-6 py-4 text-center">Client Sarah</td>
                <td className="px-6 py-4 text-right">15 mins ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;