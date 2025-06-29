import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/Authcontext";
import { toast } from "react-toastify";

const MySubmissions = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/submissions/by-worker/${user.email}`);
        setSubmissions(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [user.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto">
      <h1 className="text-2xl text-gray-600 font-bold mb-6 text-center font-o">My Submissions</h1>
      {submissions.length === 0 ? (
        <p className="text-gray-500 text-center text-xl">You haven't submitted any tasks yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full table-auto text-sm bg-white">
            <thead className="bg-green-100 text-green-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Task Title</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Buyer</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Submitted On</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {submissions.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-green-50 transition-all duration-300 ease-in-out"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.task_title}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">${item.payable_amount}</td>
                  <td className="px-6 py-4">{item.Buyer_name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                        item.status === "pending"
                          ? "bg-green-600" // ✅ now green
                          : item.status === "approved"
                          ? "bg-blue-600"
                          : "bg-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(item.current_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
