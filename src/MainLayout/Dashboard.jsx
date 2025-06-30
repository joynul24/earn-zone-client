import { NavLink, Outlet } from "react-router-dom";
import dashboardLogo from "../assets/logos/earn-logo.png";
import { FaBell, FaHome } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../context/Authcontext";
import { getNavLinkClass } from "../components/Utilitis/getNavLinkClass .js";
import useUserRole from "../components/shared/hooks/UseUserRole.jsx";
import useUserCoin from "../components/shared/hooks/useUserCoin.jsx";
import { GoTasklist } from "react-icons/go";
import { MdTask } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { TbCoinFilled } from "react-icons/tb";
import { FaUsersGear } from "react-icons/fa6";
import { MdManageSearch } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { userRole, loadingRole } = useUserRole();
  const { userCoin, loadingCoin } = useUserCoin();
  if (loadingRole || loadingCoin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <div className="flex items-center gap-2 p-6 border-b">
            <img className="w-8" src={dashboardLogo} alt="Logo" />
            <h1 className="text-xl font-bold text-gray-700 font-o">
              Dashboard
            </h1>
          </div>
          <nav className="mt-4 px-4">
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className={getNavLinkClass}>
                  <FaHome />
                  Home
                </NavLink>
              </li>

              {/* Show only if role is "worker" */}
              {userRole === "worker" && (
                <>
                  <li>
                    <NavLink to="taskList" className={getNavLinkClass}>
                      <GoTasklist />
                      Task List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="MySubmissions" className={getNavLinkClass}>
                      <MdTask />
                      My Submission
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="withdrawals" className={getNavLinkClass}>
                      <GiReceiveMoney />
                      Withdrawals
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="paymentHistory" className={getNavLinkClass}>
                      <FaHistory />
                      Payment History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-profile" className={getNavLinkClass}>
                      <CgProfile />
                      My Profile
                    </NavLink>
                  </li>
                </>
              )}
              {/* Show only if role is "buyer" */}
              {userRole === "buyer" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/addNewTask"
                      className={getNavLinkClass}
                    >
                      <MdAddTask />
                      Add New Task
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/myTask" className={getNavLinkClass}>
                      <FaTasks />
                      My Task
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/purchaseCoin"
                      className={getNavLinkClass}
                    >
                      <TbCoinFilled />
                      Purchase Coin
                    </NavLink>
                  </li>
                </>
              )}
              {/* Show only if role is "Admin" */}
              {userRole === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manageUsers"
                      className={getNavLinkClass}
                    >
                      <FaUsersGear />
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/manageTask"
                      className={getNavLinkClass}
                    >
                      <MdManageSearch />
                      Manage Task
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </aside>

        {/* Main Section */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-white shadow-md px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base font-semibold text-gray-600 font-o">
                Available Coins:{" "}
                <span className="text-orange-400">{userCoin}</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-gray-600 flex items-center gap-2">
                <FaBell className="text-xl cursor-pointer hover:text-blue-500" />
              </div>

              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-bold text-gray-700 font-i">
                  Role:{" "}
                  <span className="text-green-700">{userRole || "User"}</span>
                </span>
                <span className="text-sm font-bold text-gray-700 font-o">
                  {user?.displayName || "Guest"}
                </span>
              </div>

              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.jpg"}
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-400 text-center text-sm text-white py-4 shadow-inner">
        &copy; {new Date().getFullYear()} EarnZone. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
