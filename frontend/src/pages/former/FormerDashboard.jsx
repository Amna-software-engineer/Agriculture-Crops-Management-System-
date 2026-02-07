import React, { useEffect, useState } from 'react';
import { Leaf, ShoppingBag, DollarSign, ShoppingCart, CheckCircle, Clock, ArrowUpRight, Users, Banknote } from 'lucide-react';
import DashboardHeader from '../../component/DashboardHeader';
import { useDispatch } from 'react-redux';
import { useGetAllOrders } from '../../api/order.api';
import { useGetAllCrops } from '../../api/crop.api';
import { useLocation } from 'react-router-dom';
import { setCrops } from '../../features/crops.slice';
import { setOrder } from '../../features/order.slice';
import { formatDistanceToNow } from 'date-fns';


const FormerDashboard = () => {
  let [cropList, setCropList] = useState([])
  let [orderList, setorderList] = useState([])
  const dispatch = useDispatch();
  const { loading, Error, getCrops } = useGetAllCrops();
  const { getOrders } = useGetAllOrders();

  const location = useLocation();
  useEffect(() => {
    const fetchAllData = async () => {
      //  fetching Data
      const [crops, orders,] = await Promise.all([
        getCrops(),
        getOrders(),
      ]);
      // updating local state
      setCropList(crops || []);
      setorderList(orders || []);
      //updating store 
      dispatch(setCrops(crops || []));
      dispatch(setOrder(orders || []));

    };

    fetchAllData();
  }, [location.pathname]);


// fining active orders
  const activeOrder = orderList?.filter(order => order?.status === "shipped");
  // calculating total price

  let totalPrice = orderList?.reduce((total,order) => {
    if (order?.status === "shipped" || order?.status === "delivered") {
      return total + order?.totalPrice;
    }
    return total;
  },0)

  const allActivities = [
    ...cropList.map(crop => ({
      action: "New Crop Added",
      detail: crop.name,
      user: "You",
      time: new Date(crop.createdAt),
      color: "text-emerald-500"
    })),

    ...orderList = orderList.map(order => ({
      action: "Order Received",
      detail: `Order #${order._id.slice(-5)}`,
      user: order?.buyer?.name || "Customer",
      time: new Date(order.createdAt),
      color: "text-blue-500"
    }))]
    let recentActivities = allActivities.sort((a,b)=>b.time-a.time);
    recentActivities= recentActivities.slice(0,5)

const getActivityIcon = (type) => {
    switch (type) {
      case 'crop': return <Leaf className="text-emerald-500" />;
      case 'order': return <ShoppingCart className="text-blue-500" />;
      default: return <Bell className="text-gray-500" />;
    }
  };
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <DashboardHeader page="Dashboard" role="Farmer" />

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Crops Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl">
            <Leaf size={24} className='text-blue-600  bg-blue-100' />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Listing</p>
            <h2 className="text-2xl font-bold text-gray-800">{cropList?.length || 0}</h2>
          </div>
        </div>

        {/* Pending Approvals Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-100 text-blue-600 rounded-xl">
            <DollarSign size={24} className='text-emerald-600' />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Earnings</p>
            <h2 className="text-2xl font-bold text-gray-800">{totalPrice || 0}</h2>
          </div>
        </div>


        {/* Active Orders Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-xl">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Active Orders</p>
            <h2 className="text-2xl font-bold text-gray-800">{activeOrder?.length || 0}</h2>
          </div>
        </div>
      </div>


      {/* Bottom Section: Recent Activity & Approval Status */}
      <div className="flex flex-wrap gap-6 w-ful">

        {/* Recent Sales Table (Flex-grow to take space) */}
        <div className="flex-2 min-w-100 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-lg">Recent Sales</h3>
          </div>

          <div className="overflow-x-auto w-11/12">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-medium">
                <tr>
                  <th className="px-6 py-4">Crop</th>
                  <th className="px-6 py-4">Buyer</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>

                <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
                  {recentActivities.map((activity, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      {/* Action Column with Icon */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-gray-50 rounded-md">
                            {/* Type ki jagah ab hum icon check karne ke liye action text use kar sakte hain */}
                            {getActivityIcon(activity.action.includes("Order") ? "order" : "crop")}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-700">
                              {activity.action}
                            </span>
                            <span className={`${activity.color} font-bold text-xs`}>
                              {activity.detail}
                            </span>
                          </div>
                        </div>
                      </td>
                    
                      {/* User Column */}
                      <td className="px-6 py-4 text-center font-medium text-gray-500">
                        {activity.user}
                      </td>

                      {/* Time Column */}
                      <td className="px-6 py-4 text-right text-gray-400 text-xs font-medium">
                        {formatDistanceToNow(activity.time, { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormerDashboard