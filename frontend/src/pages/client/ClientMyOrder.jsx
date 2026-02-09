
import React, { useEffect, useState } from 'react';
import { Clock, Truck, CheckCircle, Package, ExternalLink, Trash2 } from 'lucide-react';
import DashboardHeader from '../../component/DashboardHeader';
import ClientCartDrawer from './ClientCartDrawer';
import { useDeleteOrder, useGetAllOrders } from '../../api/order.api';
import { setOrder } from '../../features/order.slice';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

const ClientMyOrder = () => {
  let [orderList, setorderList] = useState([])
  const dispatch = useDispatch();
  const { getOrders } = useGetAllOrders();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { deleteOrder } = useDeleteOrder();
  // fetching all orders
  useEffect(() => {
    const fetchAllData = async () => {
      //  fetching Data
      const orders = await getOrders()
      // updating local state
      setorderList(orders || []);
      //updating store 
      dispatch(setOrder(orders || []));
    };

    fetchAllData();
  }, [location.pathname]);

  console.log(orderList);
    orderList=useSelector(state => state.orders.orders);
  const handleDelete = async (id) => {
    await deleteOrder(id);  
  }
  

  return (
   <div className="p-6 bg-gray-50 h-screen flex flex-col"> 
  
  <DashboardHeader page={"My Orders"} role={"Client"} onCartClick={() => setIsCartOpen(true)} />

  <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 mt-8 flex flex-col flex-1 overflow-hidden">
    {/* Header section  */}
    <div className="p-8 border-b border-gray-50 flex justify-between items-center shrink-0">
      <div>
        <h3 className="font-bold text-gray-800 text-xl tracking-tight">My Purchases</h3>
        <p className="text-gray-400 text-xs mt-1 font-medium">Manage your active orders</p>
      </div>
      <span className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-xs font-bold border border-emerald-100">
        {orderList.length} Items Ordered
      </span>
    </div>

    <div className="overflow-y-auto flex-1 px-4 custom-scrollbar"> 
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead className="text-gray-400 text-[11px] uppercase font-bold tracking-[0.15em] sticky top-0 bg-white z-10">
          <tr>
            <th className="px-6 py-4">Order ID</th>
            <th className="px-6 py-4">Item Detail</th>
            <th className="px-6 py-4">Total Amount</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Current Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

            <tbody className="text-sm">
              {orderList.map((order) => (
                <tr key={order._id} className="bg-white hover:bg-gray-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-400">#{order?._id.slice(-6)}</p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl">📦</div>
                      <div>
                        <p className="font-bold text-slate-800 leading-tight">
                          {order.items?.[0]?.crop?.name}
                          {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                        </p>
                        <p className="text-emerald-500 font-bold text-[11px] mt-0.5">VERIFIED QUALITY</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-bold text-slate-800 text-base">
                    Rs. {order?.totalPrice}
                    {/* Quantity ke liye items array ka total nikal sakte hain */}
                    <p className="text-[10px] text-gray-300 font-bold uppercase">
                      {order.items?.reduce((sum, i) => sum + i.quantity, 0)} Units
                    </p>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-400">{format(new Date(order?.createdAt), 'dd MMM yyyy')}</td>

                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold border shadow-sm ${order?.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      order?.status === 'shipped' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                      {order?.status === 'pending' && <Clock size={12} strokeWidth={3} />}
                      {order?.status === 'shipped' && <Truck size={12} strokeWidth={3} />}
                      {order?.status === 'delivered' && <CheckCircle size={12} strokeWidth={3} />}
                      <span className="uppercase tracking-widest">{order?.status === 'pending' ? 'Processing' : order?.status}</span>
                    </span>
                  </td>

                  {/*  Delete */}
                  <td className="px-6 py-5 last:rounded-r-3xl">
                    <div className="flex justify-center gap-4">
                      <button className="text-gray-300 hover:text-red-400 transition-colors" onClick={()=>handleDelete(order?._id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*  cart */}
      <ClientCartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ClientMyOrder;