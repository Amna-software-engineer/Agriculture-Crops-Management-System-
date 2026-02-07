
import React, { useState } from 'react';
import { Clock, Truck, CheckCircle, Package } from 'lucide-react';
import DashboardHeader from '../../component/DashboardHeader';
import { useEditOrderStatus } from '../../api/order.api';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '../../features/order.slice';

const FormerOrders = () => {
  const { editStatus } = useEditOrderStatus();
  const orderList = useSelector(state => state.orders?.orders)
  const dispatch = useDispatch()
  // funstion to handle edit status
  const HandleStatus = async (status, id) => {
    console.log("status ", status);
    const updatedList = await editStatus({ status: status }, id);
    dispatch(setOrder(updatedList));
  }


  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      {/* Header Section */}
      <DashboardHeader page={"Orders"} role={"Former"} />

      {/* Orders Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">All Crop Listings</h3>
          <span className="text-sm text-gray-500 font-medium">{orderList?.length || 0} Total Listings</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">Crop Info</th>
                <th className="px-6 py-5">Buyer</th>
                <th className="px-6 py-5">Total Price</th>
                <th className="px-6 py-5">Current Status</th>
                <th className="px-6 py-5 text-center">Update Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-sm">

              {orderList ? orderList.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/30">
                  {/* Order ID */}
                  <td className="px-6 py-6">
                    <p className="font-bold text-slate-400">#{order?._id.slice(0, 5)}</p>
                    <p className="text-[10px] text-gray-300 font-bold">{order.time}</p>
                  </td>

                  {/* Crop Info */}
                  <td className="px-6 py-6">
                    <p className="font-bold text-slate-800">{order.crop.name}</p>
                    <p className="text-emerald-500 font-bold text-xs">{order.quantity}</p>
                  </td>

                  {/* Buyer */}
                  <td className="px-6 py-6 text-slate-500 font-medium">
                    {order.buyer.name}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-6 font-bold text-slate-800">
                    {order.totalPrice}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-6">
                    <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-[9px] font-bold border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : order.status === 'shipped' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                      {order.status === 'pending' && <Clock size={12} />}
                      {order.status === 'shipped' && <Truck size={12} />}
                      {order.status === 'delivered' && <CheckCircle size={12} />}
                      {order.status}
                    </span>
                  </td>

                  {/* Update Status Icons */}
                  <td className="px-6 py-6">
                    <div className="flex justify-center gap-4">
                      <button className="text-orange-300 hover:text-orange-500 transition-colors" onClick={() => HandleStatus("pending", order._id)}><Clock size={18} /></button>
                      <button className="text-blue-300 hover:text-blue-500 transition-colors" onClick={() => HandleStatus("shipped", order._id)}><Truck size={18} /></button>
                      <button className="text-emerald-300 hover:text-emerald-500 transition-colors" onClick={() => HandleStatus("delivered", order._id)} ><CheckCircle size={18} /></button>
                    </div>
                  </td>
                </tr>
              )) : /* No Order Found */
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Package className="text-gray-200" size={40} />
                      <p className="text-gray-400 font-medium">No Orders Found</p>
                    </div>
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>

        {/* Footer Hint */}
        <div className="bg-gray-50/50 p-4 border-t border-gray-50">
          <p className="text-[10px] text-gray-300 font-bold tracking-widest uppercase text-center">
            Select an icon to change the order status
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormerOrders;