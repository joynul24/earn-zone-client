import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/Authcontext";
import useUserCoin from "../../components/shared/hooks/useUserCoin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PurchaseCoin = () => {
  const [currentCoins, setCurrentCoins] = useState(0);
  const [loadingId, setLoadingId] = useState(null);
  const {setUserCoin} = useUserCoin()
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const coinsData = [
    { id: 1, coins: 10, price: 1, color: "bg-blue-500" },
    { id: 2, coins: 150, price: 10, color: "bg-green-500" },
    { id: 3, coins: 500, price: 20, color: "bg-yellow-500" },
    { id: 4, coins: 1000, price: 35, color: "bg-red-500" },
  ];

  useEffect(() => {
    const fetchUserCoins = async () => {
      if (!user?.email) {
        console.log("No user email found");
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/coin/${user.email}`
        );
        setCurrentCoins(res.data.coin || 0);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
      }
    };

    fetchUserCoins();
  }, [user]);

  const handlePurchase = async (id, coins, price) => {
    setLoadingId(id);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/add-coin/${user.email}`,
        {
          coin: coins,
        }
      );
      setCurrentCoins(res.data.updatedCoins);
      setUserCoin(res.data.updatedCoins);
      toast.success(`✅ Successfully purchased ${coins} coins for $${price}!`);
      navigate('/dashboard/addNewTask')
    } catch (error) {
     alert(`❌ Payment failed. Please try again.\n${JSON.stringify(error)}`);
    }
    setLoadingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-o font-bold mb-4 text-center">Purchase Coins</h1>
      <div className="mb-6 text-center text-xl">
        <span className="font-semibold font-i">Your Current Coins: </span>
        <span className="text-blue-600">{currentCoins}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {coinsData.map(({ id, coins, price, color }) => (
          <div
            key={id}
            onClick={() => !loadingId && handlePurchase(id, coins, price)}
            className={`${color} text-white rounded-xl shadow-lg p-8 flex flex-col items-center cursor-pointer hover:scale-105 transform transition duration-300`}
          >
            <h2 className="text-5xl font-extrabold mb-2">{coins}</h2>
            <p className="text-lg mb-1 font-bold">Coins</p>
            <p className="text-3xl font-semibold mb-2">=</p>
            <p className="text-4xl font-semibold">${price}</p>
            {loadingId === id && (
              <p className="mt-4 animate-pulse">Processing...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
