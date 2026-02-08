
import React, { useState } from 'react';
import { Leaf, Plus, Pencil, Trash2 } from 'lucide-react';
import DashboardHeader from '../../component/DashboardHeader';
import { useSelector } from 'react-redux';
import { useDeleteCrop, useEditCropStatus } from '../../api/crop.api';
import EditCropModal from '../../component/farmer/EditCropModal';



const FarmerCrops = () => {
  const [seletectedCrop, setSeletectedCrop] = useState(null);
  const [isModelOpen, setisModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const { editStatus } = useEditCropStatus()
  const { deleteCrop, loading } = useDeleteCrop()
  const cropList = useSelector(state => state.crops.crops);


  // function to edit crop
  const HandleEditCrop = async (crop) => {
    setisModelOpen(true);
    setIsEdit(true);
    setSeletectedCrop(crop);

  }
  // function to add crop
  const HandleAddCrop = async () => {
    setisModelOpen(true);
    setIsEdit(false);
    setIsAdd(true)

  }
  // function to delete crop
  const handleDelete = async (id) => {
    console.log("id ", id);
    const updatedList = await deleteCrop(id);
    console.log("updatedList ", updatedList);
  }

  return (
    <>
      <div className="p-6 bg-gray-50 h-screen flex flex-col overflow-hidden">
        <div className="shrink-0">
          <DashboardHeader page={"My Crops"} role={"Farmer"} />
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-end items-center gap-4 my-7 shrink-0">
          <button className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 shadow-md" onClick={() => { setIsEdit(false); HandleAddCrop() }}>
            <Plus size={20} /> Add New Crop
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1">

          <div className="overflow-y-auto flex-1 custom-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[11px] uppercase tracking-wider font-bold sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-8 py-5 bg-gray-50">Crop Info</th>
                  <th className="px-8 py-5 bg-gray-50">Quantity / Price</th>
                  <th className="px-8 py-5 bg-gray-50">Status</th>
                  <th className="px-8 py-5 text-right bg-gray-50">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {cropList && cropList.map((crop) => (
                  <tr key={crop?._id} className="hover:bg-gray-50/30 transition-all">
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-800 text-base">{crop?.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{crop?.cropType}</p>
                    </td>

                    <td className="px-8 py-6">
                      <p className="font-bold text-emerald-600 text-base">{crop?.quantity}</p>
                      <p className="text-gray-400 text-xs mt-0.5">Rs. {crop?.price}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${crop?.status === 'Live' ? 'bg-emerald-100 text-emerald-600 border-emerald-200' :
                        crop?.status === 'Pending' ? 'bg-amber-100 text-amber-600 border-amber-200' :
                          crop?.status === 'Rejected' ? 'bg-red-100 text-red-600 border-red-200' :
                            crop?.status === 'Sold Out' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                              'bg-blue-100 text-blue-600 border-blue-200'
                        }`}>
                        {crop?.status}
                      </span>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-3">
                        <button className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => HandleEditCrop(crop)}>
                          <Pencil size={18} />
                        </button>
                        <button className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleDelete(crop?._id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Info - Fixed at bottom of the card */}
          <div className="p-6 bg-gray-50/50 border-t border-gray-50 shrink-0">
            <p className="text-gray-400 text-xs font-medium">{cropList.length} Total Listings</p>
          </div>
        </div>
      </div>
      {/*  edit user model */}
      {isModelOpen && isEdit && <EditCropModal setisModelOpen={setisModelOpen} isModelOpen={isModelOpen} crop={seletectedCrop} isEdit={isEdit} />}
      {/*  edit user model */}
      {isModelOpen && isAdd && <EditCropModal setisModelOpen={setisModelOpen} isModelOpen={isModelOpen} isAdd={isAdd} />}
    </>
  );
};

export default FarmerCrops;