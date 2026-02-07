"use client"
import React, { useEffect, useState } from 'react';
import { Users, Leaf, ShoppingBag, UserPlus, ShoppingCart, Bell, Loader } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useGetAllCrops } from '../../api/crop.api';
import { useGetAllOrders } from '../../api/order.api';
import { useGetAllUsers } from '../../api/user.api';
import { setCrops } from '../../features/crops.slice';
import { setOrder } from '../../features/order.slice';
import { setUser } from '../../features/user.slice';
import { formatDistanceToNow } from "date-fns"

import { useLocation } from 'react-router-dom';
import DashboardHeader from '../../component/DashboardHeader';

const AdminDashboard = () => {
  const [cropList, setCropList] = useState([])
  const [orderList, setorderList] = useState([])
  const [userList, setUserList] = useState([])
  const dispatch = useDispatch();
  const { loading, Error, getCrops } = useGetAllCrops();
  const { getOrders } = useGetAllOrders();
  const { getUsers } = useGetAllUsers();
  const location = useLocation();
  useEffect(() => {
    const fetchAllData = async () => {
      //  fetching Data
      const [crops, orders, users] = await Promise.all([
        getCrops(),
        getOrders(),
        getUsers()
      ]);

      // updating local state
      setCropList(crops || []);
      setorderList(orders || []);
      setUserList(users || []);

      //updating store 
      dispatch(setCrops(crops || []));
      dispatch(setOrder(orders || []));
      dispatch(setUser(users || []));
    };

    fetchAllData();
  }, [location.pathname]);


  const accessToken = localStorage.getItem('accessToken')


  // Recent Activity logic
  const allActivities = [
    ...cropList.map(crop => ({
      action: "New Crop Listed ",
      detail: crop.name,
      user: crop?.formerId?.name || "Farmer",
      time: new Date(crop.createdAt),
      type: "crop"
    })),

    ...orderList.map(order => ({
      action: "New Order Placed ",
      detail: `Order #${order._id.slice(-5)}`,
      user: order?.buyer?.name || "Customer",
      time: new Date(order.createdAt),
      type: "order"
    })),

    ...userList.map(user => ({
      text: "New User Registered ",
      detail: user.role,
      user: user.name,
      time: new Date(user.createdAt),
      type: "user"
    }))
  ]
  const sortedActivities = allActivities.sort((a, b) => b.time - a.time); //a first elment of array, b last it find defference is + then 1st element is geater- this will sort in Descending order. it works like bouble sort
  const recentActivities = allActivities.slice(0, 4) //take only 1st five activites(recent)
  const getActivityIcon = (type) => {
    switch (type) {
      case 'crop': return <Leaf className="text-emerald-500" />;
      case 'order': return <ShoppingCart className="text-blue-500" />;
      case 'user': return <UserPlus className="text-purple-500" />;
      default: return <Bell className="text-gray-500" />;
    }
  };
  if (loading) {
    return <Loader />
  }
  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <DashboardHeader page="Dashboard" role={"Administrator"}/>
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Users</p>
            <h2 className="text-2xl font-bold text-gray-800">{userList?.length || 0}</h2>
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
          <table className="w-11/12 text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3 text-center">User</th>
                <th className="px-6 py-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
              {recentActivities.map((activity, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  {/* Action Column with Icon */}
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-gray-50 rounded-md">
                        {getActivityIcon(activity.type)}
                      </div>
                      <span>
                        {activity.action}
                        <span className="text-emerald-600 font-medium">
                          {activity.detail || activity.name}
                        </span>
                      </span>
                    </div>
                  </td>

                  {/* User Column */}
                  <td className="px-6 py-3 text-center font-medium text-gray-700">
                    {activity.user || "System"}
                  </td>

                  {/* Time Column */}
                  <td className="px-6 py-3 text-right text-gray-400 text-xs">
                    {formatDistanceToNow(activity.time, { addSuffix: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;