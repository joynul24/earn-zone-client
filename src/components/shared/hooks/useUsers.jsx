import { useEffect, useState } from "react";
import axios from "axios";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env. VITE_API_URL}/users`);
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getUsers();
  }, []);
  return { users, loading, error };
};

export default useUsers;
