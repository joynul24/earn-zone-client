import {useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

const Withdrawals = () => {
  const { user } = useContext(AuthContext);
  const [coin, setCoin] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Watch coin input to calculate dollar value
  const coinToWithdraw = watch("withdrawal_coin");

  useEffect(() => {
    if (coinToWithdraw) {
      setWithdrawAmount(parseInt(coinToWithdraw) / 20);
    } else {
      setWithdrawAmount(0);
    }
  }, [coinToWithdraw]);

  useEffect(() => {
    // Fetch user coin info
    const fetchCoin = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/coin/${user?.email}`
        );
        setCoin(res.data.coin || 0);
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message || "Failed to fetch coin data!");
      }
    };
    fetchCoin();
  }, [user]);

  const onSubmit = async (data) => {
    if (data.withdrawal_coin > coin) {
      return toast.error("You cannot withdraw more than your current coins.");
    }

    const payload = {
      worker_email: user?.email,
      worker_name: user?.displayName,
      withdrawal_coin: parseInt(data.withdrawal_coin),
      withdrawal_amount: withdrawAmount,
      payment_system: data.payment_system,
      account_number: data.account_number,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/withdrawals`,
        payload
      );
      if (res.data.insertedId) {
        toast.success("Withdrawal request submitted");
        reset();
        navigate('/dashboard/paymentHistory')
      }
    } catch (error) {
       toast.error(error?.response?.data?.message || error?.message || "Something went wrong, try again");
    }
  };

  return (
    <div className="pt-24 px-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center font-o">Withdrawals Section</h1>
      <div className="bg-white shadow-xl rounded-xl p-6 border-gray-400 border">
        <p className="mb-4 text-gray-600">
          <strong>Current Coin:</strong> {coin} <br />
          <strong>Withdrawable Amount:</strong> ${(coin / 20).toFixed(2)}
        </p>

        {coin >= 200 ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Coin to Withdraw</label>
              <input
                type="number"
                {...register("withdrawal_coin", { required: true })}
                className="input input-bordered w-full mt-1"
                max={coin}
              />
              {errors.withdrawal_coin && <p className="text-red-500">This field is required</p>}
            </div>

            <div>
              <label className="block font-medium">Withdraw Amount ($)</label>
              <input
                type="number"
                value={withdrawAmount}
                readOnly
                className="input input-bordered w-full mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium">Select Payment System</label>
              <select
                {...register("payment_system", { required: true })}
                className="select select-bordered w-full mt-1"
              >
                <option value="">Select One</option>
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
                <option value="Upay">Upay</option>
              </select>
              {errors.payment_system && <p className="text-red-500">This field is required</p>}
            </div>

            <div>
              <label className="block font-medium">Account Number</label>
              <input
                type="text"
                {...register("account_number", { required: true })}
                className="input input-bordered w-full mt-1"
              />
              {errors.account_number && <p className="text-red-500">This field is required</p>}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit Withdrawal
            </button>
          </form>
        ) : (
          <p className="text-red-500 text-center mt-4">Insufficient coin</p>
        )}
      </div>
    </div>
  );
};

export default Withdrawals;