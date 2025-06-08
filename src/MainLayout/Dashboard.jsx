import { NavLink, Outlet } from "react-router-dom";
import dashboardLogo from "../assets/logos/earn-logo.png";
import { FaBell } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../context/Authcontext";
import { getNavLinkClass } from "../components/Utilitis/getNavLinkClass .js";
import useUserRole from "../components/shared/hooks/UseUserRole.jsx";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { userRole, loadingRole } = useUserRole();

  if (loadingRole) {
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
                  Home
                </NavLink>
              </li>

              {/* Show only if role is "worker" */}
              {userRole === "worker" && (
                <>
                  <li>
                    <NavLink to="taskList" className={getNavLinkClass}>
                      Task List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="MySubmissions" className={getNavLinkClass}>
                      My Submission
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="withdrawals" className={getNavLinkClass}>
                      Withdrawals
                    </NavLink>
                  </li>
                </>
              )}
              {/* Show only if role is "buyer" */}
              {userRole === "buyer" && (
                <>
                  <li>
                    <NavLink to="addNewTask" className={getNavLinkClass}>
                      Add New Task
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="myTask" className={getNavLinkClass}>
                      My Task
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="purchaseCoin" className={getNavLinkClass}>
                      Purchase Coin
                    </NavLink>
                  </li>
                </>
              )}
              {/* Show only if role is "Admin" */}
              {userRole === "admin" && (
                <>
                  <li>
                    <NavLink to="manageUsers" className={getNavLinkClass}>
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="manageTask" className={getNavLinkClass}>
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
                Available Coins: <span className="text-blue-600">0</span>
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
