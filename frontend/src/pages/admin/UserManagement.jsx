import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import AdminDashboardHeader from '../../component/DashboardHeader';
import { useNavigate } from 'react-router-dom';
import EditUserModal from '../../component/admin/EditUserModal';
import { useDeleteUser } from '../../api/user.api';


const UserManagement = () => {
  const navigate = useNavigate();
  const userList = useSelector(state => state.users.Users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModelOpen, setisModelOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const {deleteUser}=useDeleteUser()
  // function to edit user
  const HandleEditUser = async (user) => {
    setisModelOpen(true);
    setIsEdit(true);
    setSelectedUser(user);

  }
  // function to add user
  const HandleAddUser = async () => {
    setisModelOpen(true);
    setIsEdit(false);
    setIsAdd(true)

  }
    // function to delete user
  const HandleDeleteUser = async (id) => {
    console.log("handle dlt User Called");
    const updatedList = await deleteUser(id);
  }



  return (
    <>
      <div className="p-6 space-y-8">
        {/* Header Section */}
        <AdminDashboardHeader page="Users"role={"Administrator"} />
        {/* Search and Add User Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">

          <button className="flex items-center gap-2 ms-auto bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-emerald-600 transition-colors w-full md:w-auto justify-center" onClick={() => {setIsEdit(false);HandleAddUser()}}>
            <Plus size={20}  />
            Add User
          </button>
        </div>

        {/* Users Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-medium">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
                {userList?.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'former' ? 'bg-emerald-100 text-emerald-700' :
                          user.role === 'client' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${user.status === 'approved' ? 'bg-emerald-500' : 'bg-orange-400'}`}></div>
                        {user.status.toUpperCase() || 'Active'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3 text-gray-400">
                        <button className="hover:text-emerald-600 transition-colors" onClick={() =>{ setIsAdd(false);HandleEditUser(user)}}>
                          <Edit2 size={18} />
                        </button>
                        <button className="hover:text-red-500 transition-colors">
                          <Trash2 size={18} onClick={()=>HandleDeleteUser(user._id)}/>
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

      {/*  edit user model */}
      {isModelOpen && isEdit && <EditUserModal setisModelOpen={setisModelOpen} isModelOpen={isModelOpen} user={selectedUser} isEdit={isEdit} />}
      {/*  edit user model */}
      {isModelOpen && isAdd && <EditUserModal setisModelOpen={setisModelOpen} isModelOpen={isModelOpen}  isAdd={isAdd}  />}
    </>
  );
};

export default UserManagement;