import { useEffect, useState } from "react";
import SectionTitle from "../../../components/shared/SectionTitle/SectionTitle";
import { toast } from "react-toastify";
import axios from "axios";

const Statistics = () => {
  const [users, setUsers] = useState([]);

  //   const [stats, setStats] = useState({
  //     totalUsers: 0,
  //     totalTasks: 0,
  //     totalPayments: 0,
  //     activeTasks: 0,
  //   });

  //   useEffect(() => {
  //     axios
  //       .get(`${import.meta.env.VITE_API_URL}/stats`)
  //       .then((res) => setStats(res.data))
  //       .catch((err) => toast.error(err.message));
  //   }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const cardStyle =
    "bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition";

  return (
    <section className="bg-gray-100 py-16 px-4 text-center mt-20 md:mt-28 rounded-xl my-12">
      <SectionTitle
        title="Platform Statistics"
        subTitle=" Get a glimpse of our platform’s success and growth in real numbers."
      ></SectionTitle>

      <div className="grid mt-16 md:mt-24 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className={cardStyle}>
          <h3 className="text-4xl font-bold text-purple-700">
            {users.length || 0}+
          </h3>
          <p className="mt-2 text-gray-700">Total Users</p>
        </div>

        <div className={cardStyle}>
          <h3 className="text-4xl font-bold text-green-600">1500+</h3>
          <p className="mt-2 text-gray-700">Tasks Completed</p>
        </div>

        <div className={cardStyle}>
          <h3 className="text-4xl font-bold text-yellow-500">$50000</h3>
          <p className="mt-2 text-gray-700">Total Payments</p>
        </div>

        <div className={cardStyle}>
          <h3 className="text-4xl font-bold text-blue-600">12000</h3>
          <p className="mt-2 text-gray-700">Active Tasks</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
