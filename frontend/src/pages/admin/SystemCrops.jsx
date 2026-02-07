import React, { useState } from 'react';
import { Check, X, Trash2, Leaf } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import AdminDashboardHeader from '../../component/DashboardHeader';
import { useSelector } from 'react-redux';
import { useDeleteCrop, useEditCropStatus } from '../../api/crop.api';


const SystemCrops = () => {
const {editStatus}=useEditCropStatus()
const {deleteCrop}=useDeleteCrop()
  const cropList = useSelector(state => state.crops.crops);
  // console.log(cropList);
  // funstion to handle edit status
  const HandleStatus = async(id,status) => {
    await editStatus(id,{status: status});
  }
  const handleDelete = async(id) => {
    console.log("id ",id);
    
    const updatedList =await deleteCrop(id);
     console.log("updatedList ", updatedList);
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <AdminDashboardHeader page="Crops" role={"Administrator"}/>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">All Crop Listings</h3>
          <span className="text-sm text-gray-500 font-medium">{cropList?.length || 0} Total Listings</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Crop Info</th>
                <th className="px-6 py-4">Farmer/Location</th>
                <th className="px-6 py-4">Quantity/Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Approvals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {cropList?.map((crop) => (
                <tr key={crop?._id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Crop Info column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{crop?.name}</span>
                      <span className="text-xs text-gray-400 italic">{crop?.cropType}</span>
                    </div>
                  </td>

                  {/* Farmer info from Populate */}
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex flex-col">
                      <span>{crop?.formerId?.name || "Unknown Farmer"}</span>
                      <span className="text-xs text-gray-400">{crop?.location}</span>
                    </div>
                  </td>

                  {/* Quantity & Price */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-emerald-600 font-bold">{crop?.quantity} kg</span>
                      <span className="text-xs text-gray-400">Rs. {crop?.price}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${crop.status === 'Live' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' :
                        crop.status === 'Pending' ? 'bg-amber-100 text-amber-600 border-amber-200' :
                          crop.status === 'Rejected' ? 'bg-red-100 text-red-600 border-red-200' :
                            crop.status === 'Sold Out' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                              'bg-blue-100 text-blue-600 border-blue-200'
                      }`}>
                      {crop?.status}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                     
                      <button className="p-1.5 hover:bg-emerald-50 text-emerald-500 rounded-md transition-colors border border-emerald-100" onClick={() => HandleStatus(crop._id,"Live")}>
                        <Check size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 text-red-400 rounded-md transition-colors border border-red-50" onClick={() => HandleStatus(crop._id,"Rejected")}>
                        <X size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-50 text-gray-300 rounded-md transition-colors ml-4" onClick={() => handleDelete(crop._id)}>
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

export default SystemCrops;