import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/tasks/available`
        );
        const filteredTasks = res.data.filter(
          (task) => task.required_workers > 0
        );
        setTasks(filteredTasks);
      } catch (error) {
        toast.error(`Failed to fetch tasks: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="pt-10 px-4 bg-gray-100 min-h-screen">
      <h1
        className="md:text-xl lg:text-3xl font-bold mb-8 text-center"
        data-aos="fade-down"
      >
        Available Tasks
      </h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">
          No available tasks right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <div
              key={task._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-lg shadow-md p-6
              hover:shadow-xl
              transition-transform duration-500 ease-in-out
              cursor-pointer
              transform hover:scale-105 hover:-translate-y-1"
            >
              <img
                src={task.task_image_url}
                alt="Task"
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="font-semibold font-o text-gray-600 mt-2 mb-2">
                {task.task_title}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-bold text-gray-700 text-xl font-o">
                  Buyer:
                </span>{" "}
                <span className="font-i font-semibold text-green-700">
                  {task.buyerInfo.name || "N/A"}
                </span>
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-bold text-gray-700 text-xl font-o">
                  Deadline:
                </span>{" "}
                <span className="font-i font-semibold">
                  {new Date(task.completion_date).toLocaleDateString()}
                </span>
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-bold text-gray-700 text-xl font-o">
                  Payable Amount:
                </span>{" "}
                <span className="font-i font-semibold text-orange-400">
                  {task.payable_amount}$
                </span>
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-bold text-gray-700 text-xl font-o">
                  Required Workers:
                </span>{" "}
                <span className="font-i font-semibold text-red-400">
                  {task.required_workers}
                </span>
              </p>

              <Link to={`/dashboard/taskDetails/${task._id}`}>
                <button className="btn w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
