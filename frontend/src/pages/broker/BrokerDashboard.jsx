import React, { useEffect, useState } from 'react';
import { Leaf, ShoppingBag, DollarSign, ShoppingCart, Package, Check, X } from 'lucide-react';
import DashboardHeader from '../../component/DashboardHeader';
import { useDispatch } from 'react-redux';
import { useGetAllOrders } from '../../api/order.api';
import { useGetAllCrops, useEditCropStatus } from '../../api/crop.api';
import { useLocation } from 'react-router-dom';
import { setCrops } from '../../features/crops.slice';
import { setOrder } from '../../features/order.slice';

const BrokerDashboard = () => {
  const [cropList, setCropList] = useState([]);
  const [orderList, setorderList] = useState([]);
  const dispatch = useDispatch();
  const { getCrops } = useGetAllCrops();
  const { getOrders } = useGetAllOrders();
  const { editStatus } = useEditCropStatus();
  const location = useLocation();

  const fetchAllData = async () => {
    const [crops, orders] = await Promise.all([
      getCrops(),
      getOrders(),
    ]);
    const cropsData = crops || [];
    const ordersData = orders || [];
    setCropList(cropsData);
    setorderList(ordersData);
    dispatch(setCrops(cropsData));
    dispatch(setOrder(ordersData));
  };

  useEffect(() => {
    fetchAllData();
  }, [location.pathname]);

  // Handle Quick Approval/Rejection
  const handleQuickStatus = async (id, status) => {
    await editStatus(id, { status: status });
    fetchAllData(); // Data refresh taake list se nikal jaye
  };

  // Stats Logic
  const activeOrders = orderList?.filter(order => order?.status === "shipped" || order?.status === "pending");
  const pendingCrops = cropList?.filter(crop => crop?.status === "Pending");

  const totalEarnings = orderList?.reduce((total, order) => {
    return (order?.status === "delivered" || order?.status === "shipped")
      ? total + (order?.totalPrice || 0)
      : total;
  }, 0);
  console.log("orderList",orderList);
  
  return (
    <div className="p-6 space-y-8 bg-gray-50 max-h-screen overflow-y-auto">
      <DashboardHeader page="Broker Overview" role="Broker" />

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
            <Package size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Pending Approvals</p>
            <h2 className="text-2xl font-bold text-gray-800">{pendingCrops?.length || 0}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Volume</p>
            <h2 className="text-2xl font-bold text-gray-800">Rs. {totalEarnings.toLocaleString()}</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-xl">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Orders</p>
            <h2 className="text-2xl font-bold text-gray-800">{activeOrders?.length || 0}</h2>
          </div>
        </div>
      </div>

      {/* NEW: Pending Approvals Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">Crops Awaiting Approval</h3>
          <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full font-bold">Action Required</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-3">Crop Name</th>
                <th className="px-6 py-3">Farmer</th>
                <th className="px-6 py-3">Price/Qty</th>
                <th className="px-6 py-3 text-center">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
              {pendingCrops.length > 0 ? (
                pendingCrops.slice(0, 5).map((crop) => (
                  <tr key={crop._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-700">{crop.name}</td>
                    <td className="px-6 py-4 text-gray-500">{crop?.farmerId?.name || "Farmer"}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs">
                        <span className="font-bold">Rs. {crop.price}</span>
                        <span>{crop.quantity} kg</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleQuickStatus(crop._id, "Live")}
                          className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => handleQuickStatus(crop._id, "Rejected")}
                          className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-400 italic">
                    All clear! No pending crops to approve.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BrokerDashboard;