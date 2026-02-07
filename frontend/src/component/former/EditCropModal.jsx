import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useAddCrop, useEditCrop, useGetAllCrops } from '../../api/crop.api';
import { useDispatch, useSelector } from 'react-redux';
import { setCrops } from '../../features/crops.slice';


const EditCropModal = ({ crop, isModelOpen, setisModelOpen, isAdd }) => {
  const formerId = useSelector(state => state.auth.currUser._id);
  console.log("formerId ", formerId);
  const [formData, setFormData] = useState({
    name: crop?.name || '',
    cropType: crop?.cropType || 'Grain',
    quantity: crop?.quantity || '',
    price: crop?.price || '',
    location: crop?.location || '',
    status: crop?.status || 'Pending',
    formerId: formerId && formerId,
  });

  if (!isModelOpen) return null;

  const { editCrop } = useEditCrop();
  const { addCrop } = useAddCrop();
  const { getCrops } = useGetAllCrops();
  const dispatch = useDispatch();

  const handleEdit = async (formData) => {

    const { name, cropType, quantity, price, location, status } = formData;
    await editCrop(crop._id, { name, cropType, quantity, price, location, status });
    setisModelOpen(false);
    const data = await getCrops();
    dispatch(setCrops(data));
  };

  const handleAdd = async (formData) => {
    console.log("handle add called", formData);

    const { name, cropType, quantity, price, location, status } = formData;
    await addCrop({ name, cropType, quantity, price, location, status,formerId });
    setisModelOpen(false);
    const data = await getCrops();
    dispatch(setCrops(data));
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">

          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-xl font-bold text-gray-800">{isAdd ? "Add New Crop" : "Edit Crop Details"}</h3>
            <button onClick={() => setisModelOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={(e) => { e.preventDefault(); isAdd ? handleAdd(formData) : handleEdit(formData); }} className="p-6 space-y-4">

            {/* Crop Name */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Crop Name</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-4">
              {/* Crop Type */}
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Type</label>
                <select
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                >
                  <option value="Grain">Grain</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Fruit">Fruit</option>
                </select>
              </div>
              {/* Status */}
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Status</label>
                <select
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option disabled={true} value="Live">Live</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              {/* Quantity */}
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Qty (kg)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
              {/* Price */}
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Price (Rs)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Location</label>
              <input
                type="text"
                placeholder="e.g. Gujranwala, Punjab"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setisModelOpen(false)}
                className="flex-1 py-3 border border-gray-200 text-gray-500 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all"
              >
                <Save size={18} />
                {isAdd ? "List Crop" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCropModal;