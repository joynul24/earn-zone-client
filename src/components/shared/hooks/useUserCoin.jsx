import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/Authcontext";
import { toast } from "react-toastify";

const useUserCoin = () => {
    const {user} = useContext(AuthContext)
  const [userCoin, setUserCoin] = useState(0);
  const [loadingCoin, setLoadingCoin] = useState(true);
  useEffect(() => {
    const fetchCoin = async () => {
      if (!user?.email) {
        setUserCoin(0);
        setLoadingCoin(false);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/coin/${user.email}`
        );
        setUserCoin(res.data.coin || 0);
      } catch (error) {
        toast.error("Error fetching coin:", error);
        setUserCoin(0);
      } finally {
        setLoadingCoin(false);
      }
    };

    fetchCoin();
  }, [user?.email]);

  return { userCoin, loadingCoin };
};

export default useUserCoin;
