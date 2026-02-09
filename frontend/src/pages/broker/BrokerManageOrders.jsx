import { Clock, CheckCircle, Truck } from 'lucide-react';
import DashboardHeader from '../../component/DashboardHeader';
import { useEditOrderStatus } from '../../api/order.api';
import { useSelector } from 'react-redux';

const BrokerManageOrders = () => {

  const { editStatus } = useEditOrderStatus();
  const orders = useSelector(state => state.orders.orders)

  // funstion to handle edit status
  const HandleStatus = async (status, id) => {
    console.log("status ", status);
    await editStatus({ status: status }, id);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardHeader page="Manage Orders" role="Broker" />

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-[11px] uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Crop Name</th>
              <th className="px-6 py-4">Farmer Details</th>
              <th className="px-6 py-4">Buyer Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-5 text-center">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {orders.map((order) => (
              order.items.map((item, index) => (
                <tr key={`${order._id}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {index === 0 ? `#${order._id.slice(-5)}` : ""}
                  </td>

                  <td className="px-6 py-4 text-emerald-600 font-medium">
                    {item.crop?.name || "N/A"} (Qty: {item.quantity})
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">{item.crop?.farmerId?.name || "N/A"}</span>
                      <span className="text-xs text-gray-400">{item.crop?.farmerId?.email}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold">{index === 0 ? order.buyer?.name : ""}</span>
                      <span className="text-xs text-gray-400">{index === 0 ? order.buyer?.email : ""}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${order.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                        'bg-emerald-100 text-emerald-600'
                      }`}>
                      {order.status}
                    </span>
                  </td>

                  {/* --- Order Action Buttons (Coordination) --- */}
                  <td className="px-6 py-4">
                    {index === 0 && (
                      <div className="flex justify-center gap-4">
                        <button className="text-orange-300 hover:text-orange-500 transition-colors" title="Process" onClick={() => HandleStatus("pending", order._id)}><Clock size={18} /></button>
                        <button className="text-blue-300 hover:text-blue-500 transition-colors" title="Ship" onClick={() => HandleStatus("shipped", order._id)}><Truck size={18} /></button>
                        <button className="text-emerald-300 hover:text-emerald-500 transition-colors" title="Deliver" onClick={() => HandleStatus("delivered", order._id)} ><CheckCircle size={18} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrokerManageOrders;