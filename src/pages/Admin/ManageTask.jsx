import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/all`);
      setTasks(res.data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
          toast.success("Task deleted successfully");
          fetchTasks();
          Swal.fire("Deleted!", "Task has been deleted.", "success");
        } catch (error) {
          toast.error(error.message || "Failed to delete task");
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Manage Task Section ({tasks.length})
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm text-gray-500 uppercase">Image</th>
                <th className="px-4 py-2 text-left text-sm text-gray-500 uppercase">Title</th>
                <th className="px-4 py-2 text-left text-sm text-gray-500 uppercase">Detail</th>
                <th className="px-4 py-2 text-left text-sm text-gray-500 uppercase">Workers</th>
                <th className="px-4 py-2 text-left text-sm text-gray-500 uppercase">Pay/Person</th>
                <th className="px-4 py-2 text-left text-sm text-gray-500 uppercase">Deadline</th>
                <th className="px-4 py-2 text-left text-sm text-gray-500 uppercase">Buyer</th>
                <th className="px-4 py-2 text-left text-sm text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img src={task.task_image_url} alt="task" className="w-12 h-12 rounded-md" />
                  </td>
                  <td className="px-4 py-3 font-semibold">{task.task_title}</td>
                  <td className="px-4 py-3">{task.task_detail}</td>
                  <td className="px-4 py-3 text-center">{task.required_workers}</td>
                  <td className="px-4 py-3 text-center">${task.payable_amount}</td>
                  <td className="px-4 py-3 text-sm">{task.completion_date}</td>
                  <td className="px-4 py-3 capitalize">{task.buyerInfo.name || "N/A"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
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

export default ManageTask;
