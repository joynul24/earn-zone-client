import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(res.data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
          toast.success("User removed successfully");
          fetchUsers();
          Swal.fire('Deleted!', 'User has been removed.', 'success');
        } catch (error) {
          toast.error(error.message || "Failed to remove user");
        }
      }
    });
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${id}`, { role: newRole });
      toast.success("Role updated successfully");
      fetchUsers();
    } catch (error) {
      toast.error(error.message || "Failed to update role");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Manage Users Section ({users.length})</h1>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Photo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Coin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-200 transition duration-300">
                  <td className="px-6 py-4">
                    <img src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.jpg"} alt="avatar" className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-bold">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <select
                      className="border px-2 py-1 text-green-800 rounded"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option>{user.role}</option>
                      <option value="buyer">Buyer</option>
                      <option value="worker">Worker</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">{user.coin}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRemove(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
