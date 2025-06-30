import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/Authcontext";
import axios from "axios";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/withdrawals/history/${user?.email}`);
        setHistory(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch payment history", error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchHistory();
    }
  }, [user]);

  return (
    <div className="mt-10 px-4 md:px-5 lg:px-10">
      <h1 className="text-2xl text-center font-semibold text-gray-700 mb-6">💰 Payment History</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="table w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Coin</th>
                <th>Amount ($)</th>
                <th>Payment Method</th>
                <th>Account Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {history.map((item, idx) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{new Date(item.withdraw_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{item.withdrawal_coin}</td>
                  <td className="px-4 py-2">${item.withdrawal_amount.toFixed(2)}</td>
                  <td className="px-4 py-2">{item.payment_system}</td>
                  <td className="px-4 py-2">{item.account_number}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${item.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 
                      item.status === 'approved' ? 'bg-green-200 text-green-800' : 
                      'bg-red-200 text-red-800'}`}
                    >
                      {item.status}
                    </span>
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

export default PaymentHistory;
