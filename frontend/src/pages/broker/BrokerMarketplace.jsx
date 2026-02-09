import React from 'react';
import { Check, X, Trash2, Mail } from 'lucide-react'; // Mail icon add kiya
import DashboardHeader from '../../component/DashboardHeader';
import { useSelector } from 'react-redux';
import { useDeleteCrop, useEditCropStatus } from '../../api/crop.api';

const BrokerMarketplace = () => {
  const { editStatus } = useEditCropStatus();
  const { deleteCrop } = useDeleteCrop();
  const cropList = useSelector(state => state.crops.crops);

  const HandleStatus = async (id, status) => {
    await editStatus(id, { status: status });
  };

  const handleDelete = async (id) => {
    await deleteCrop(id);
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <DashboardHeader page="Marketplace Management" role="Broker" />

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">Crop Listings</h3>
          <span className="text-sm text-gray-500 font-medium">{cropList?.length || 0} Total Items</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Crop Details</th>
                <th className="px-6 py-4">Farmer Info</th>
                <th className="px-6 py-4">Inventory/Price</th>
                <th className="px-6 py-4 text-center">Market Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {cropList?.map((crop) => (
                <tr key={crop?._id} className="hover:bg-gray-50/50 transition-colors">
                  
                  {/* Crop Info */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{crop?.name}</span>
                      <span className="text-[10px] text-gray-400 px-2 py-0.5 bg-gray-100 rounded-full w-fit mt-1">
                        {crop?.cropType}
                      </span>
                    </div>
                  </td>

                  {/* Farmer Info with Email Link */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-700">{crop?.farmer?.name || "Unknown Farmer"}</span>
                      <a 
                        href={`mailto:${crop?.farmer?.email}`} 
                        className="text-emerald-600 text-[11px] flex items-center gap-1 hover:underline"
                      >
                        <Mail size={12} /> Contact Farmer
                      </a>
                    </div>
                  </td>

                  {/* Quantity & Price */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium">{crop?.quantity} kg</span>
                      <span className="text-xs text-emerald-600 font-bold">Rs. {crop?.price}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      crop.status === 'Live' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      crop.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {crop?.status}
                    </span>
                  </td>

                  {/* Broker Controls */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                        title="Approve Listing"
                        className="p-1.5 hover:bg-emerald-50 text-emerald-500 rounded-md transition-colors border border-emerald-100" 
                        onClick={() => HandleStatus(crop._id, "Live")}
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        title="Reject Listing"
                        className="p-1.5 hover:bg-red-50 text-red-400 rounded-md transition-colors border border-red-50" 
                        onClick={() => HandleStatus(crop._id, "Rejected")}
                      >
                        <X size={16} />
                      </button>
                      <button 
                        title="Remove"
                        className="p-1.5 hover:bg-gray-100 text-gray-400 rounded-md transition-colors" 
                        onClick={() => handleDelete(crop._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export default BrokerMarketplace;