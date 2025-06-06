// import React, { useContext, useEffect, useState } from "react";
// import AuthContext from "../../../context/Authcontext";
// import { toast } from "react-toastify";

// const UseUserRole = () => {
//   const { user } = useContext(AuthContext);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`${import.meta.env.VITE_API_URL}/users/role/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setUserRole(data.role || null);
//           setLoading(false);
//         })
//         .catch((err) => {
//           toast.error(err.message);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   return { userRole, loading };
// };

// export default UseUserRole;
