import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/Authcontext";
import axios from "axios";
import { toast } from "react-toastify";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.email) {
        setRole(null);
        setLoadingRole(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/role/${user.email}`
        );
        setRole(response.data.role);
      } catch (error) {
        toast.error("Error fetching user role:", error);
        setRole(null);
      } finally {
        setLoadingRole(false);
      }
    };

    fetchUserRole();
  }, [user?.email]);

  return { userRole, loadingRole };
};

export default useUserRole;
