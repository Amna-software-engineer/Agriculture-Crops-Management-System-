import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useAddUser, useEditlUser, useGetAllUsers } from '../../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/user.slice'

const EditUserModal = ({ user, isModelOpen, setisModelOpen, isAdd }) => {


  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: "example@gmail.com",
    password: '••••••••',
    role: user?.role || '',
    status: user?.status || 'Pending',

  });

  if (!isModelOpen) return null;
  const { editUser } = useEditlUser();
  const { getUsers } = useGetAllUsers();
  const { addUser } = useAddUser();
  const dispatch = useDispatch()

  const handleEdit = async (formData) => {
    await editUser(user._id, formData);
    setisModelOpen(false);
  }

  const handleAdd = async (formData) => {
    const { name, email, password, role, status } = formData;
    await addUser({ name, email, password, role, status });
    setisModelOpen(false);
  }
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-800">{isAdd ? "Add New User " : "Edit User Profile"} </h3>
          <button onClick={() => (setisModelOpen(false))} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Modal Body (Form) */}
        <form onSubmit={(e) => { e.preventDefault(); isAdd ? handleAdd(formData) : handleEdit(formData); }}
          className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          {/* Email Field */}
          {isAdd && <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name='email'
              type="email"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>}
          {/* Password Field */}
          {isAdd && <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name='password'
              type="password"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>}
          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
              value={formData.role} name='role'
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="former">Farmer</option>
              <option value="client">Client</option>
              <option value="broker">Broker</option>
            </select>
          </div>
          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
            <select
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              {/* <option value="Suspended">Suspended</option> */}
            </select>
          </div>


          {/* Modal Footer (Buttons) */}
          <div className="p-6 bg-gray-50 flex gap-3">
            <button
              onClick={() => setisModelOpen(false)}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-600 transition-colors" type='submit'>
              <Save size={18} />
              {isAdd ? "Create User" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;