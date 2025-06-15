import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../../context/Authcontext";
import useUserCoin from "../../components/shared/hooks/useUserCoin";

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const { setUserCoin } = useUserCoin();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/tasks/by-user/${user.email}`)
        .then((res) => {
          const sorted = res.data.sort(
            (a, b) => new Date(b.completion_date) - new Date(a.completion_date)
          );
          setTasks(sorted);
        })
        .catch((err) => console.error("Error fetching tasks:", err));
    }
  }, [user?.email]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedTask = {
      task_title: form.title.value,
      task_detail: form.detail.value,
      submission_info: form.submission.value,
    };

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/tasks/${editingTask._id}`,
        updatedTask
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Task updated successfully.", "success");
          setEditingTask(null);
          setTasks((prev) =>
            prev.map((task) =>
              task._id === editingTask._id ? { ...task, ...updatedTask } : task
            )
          );
        }
      });
  };

  const handleDelete = async (task) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`);
      if (!task.isCompleted) {
        const refillAmount = task.required_workers * task.payable_amount;
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/coin-increase/${user.email}`,
          {
            coin: refillAmount,
          }
        );
        setUserCoin((prev) => prev + refillAmount);
      }

      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      Swal.fire("Deleted!", "Task has been deleted.", "success");
    }
  };

  return (
    <div className="pt-24 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 max-w-screen-xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center md:text-left font-o">
        My Tasks: <span className="text-blue-500 ml-1">{tasks.length}</span>
      </h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600 font-i text-xl">
          No tasks added yet.
        </p>
      ) : (
        <div className="bg-white overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-[800px] w-full text-sm text-left">
            <thead className="bg-gray-200 text-gray-700 uppercase text-xs sm:text-sm">
              <tr>
                <th className="p-3 sm:p-4">Title</th>
                <th className="p-3 sm:p-4">Details</th>
                <th className="p-3 sm:p-4">Submission Info</th>
                <th className="p-3 sm:p-4">Workers</th>
                <th className="p-3 sm:p-4">Amount</th>
                <th className="p-3 sm:p-4">Date</th>
                <th className="p-3 sm:p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-t hover:bg-gray-200 transition duration-400"
                >
                  <td className="p-3 sm:p-4">{task.task_title}</td>
                  <td className="p-3 sm:p-4">{task.task_detail}</td>
                  <td className="p-3 sm:p-4">{task.submission_info}</td>
                  <td className="p-3 sm:p-4">{task.required_workers}</td>
                  <td className="p-3 sm:p-4">${task.payable_amount}</td>
                  <td className="p-3 sm:p-4">
                    {new Date(task.completion_date).toLocaleDateString()}
                  </td>
                  <td className="p-3 sm:p-4 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs sm:text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs sm:text-sm"
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

      {/* Update Modal */}
      {editingTask && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md shadow space-y-4"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-center">
              Update Task
            </h2>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={editingTask.task_title}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label
                htmlFor="detail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Task Detail
              </label>
              <textarea
                id="detail"
                name="detail"
                defaultValue={editingTask.task_detail}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter task detail"
              />
            </div>

            <div>
              <label
                htmlFor="submission"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Submission Info
              </label>
              <textarea
                id="submission"
                name="submission"
                defaultValue={editingTask.submission_info}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter submission instruction"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyTask;
