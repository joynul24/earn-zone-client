import "./Navber.css";
import logo from "../../../assets/logos/earn-logo.png";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/Authcontext";
import { Link, NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const Navbar = () => {
  const { signOutUser, user } = useContext(AuthContext);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${user.email}`
          );
          setCoins(res.data.coin || 0);
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleSignOut = () => {
    signOutUser();
    toast.success("User Signed Out Successfully");
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <button className="">
          Available Coin
          <div className="badge badge-xs badge-secondary">{coins || 0}</div>
        </button>
      </li>
      {user && (
        <li>
          <NavLink to="dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar font-i max-w-7xl mx-auto fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <div className="flex items-center gap-2">
            <img className="w-[25px] md:w-[40px]" src={logo} alt="Logo" />
            <h3 className="md:text-xl md:font-bold font-o text-[#3882F6]">
              Earn Zone
            </h3>
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-black">{links}</ul>
      </div>

      <div className="navbar-end gap-2">
        <Link to="https://github.com/joynul24/earn-zone-client">
          <button className="btn border-0 btn-sm text-[10px]">
            Join as Developer
          </button>
        </Link>

        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                title={user?.displayName}
                className="w-10 rounded-full border-green-500 border-[1px]"
              >
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="#">Update Profile</NavLink>
              </li>
              <li>
                <NavLink to="#">Settings</NavLink>
              </li>
              <li className="mt-2">
                <button
                  onClick={handleSignOut}
                  className="btn btn-ghost bg-gray-200 text-gray-600"
                >
                  <FiLogOut />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn border-0 btn-sm text-[10px]">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
