import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../components/shared/ErrorPage/ErrorPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import MySubmissions from "../pages/worker/MySubmissions";
import AddNewTask from "../pages/Buyer/AddNewTask";
import TaskList from "../pages/worker/TaskList";
import MyTask from "../pages/Buyer/MyTask";
import PrivateRoute from "../components/shared/PrivateRoute/PrivateRoute ";
import Dashboard from "../MainLayout/Dashboard";
import Withdrawals from "../pages/worker/Withdrawals";
import PurchaseCoin from "../pages/Buyer/PurchaseCoin";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageTask from "../pages/Admin/ManageTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: async () => {
          return new Promise((resolve) =>
            setTimeout(() => resolve(null), 1000)
          );
        },
      },
      // Worker Role Route
      {
        path: "taskList",
        element: (
          <PrivateRoute>
            <TaskList></TaskList>
          </PrivateRoute>
        ),
      },
      {
        path: "MySubmissions",
        element: (
          <PrivateRoute>
            <MySubmissions></MySubmissions>
          </PrivateRoute>
        ),
      },
      // Buyer Role Route
      {
        path: "addNewTask",
        element: (
          <PrivateRoute>
            <AddNewTask></AddNewTask>
          </PrivateRoute>
        ),
      },
      {
        path: "myTask",
        element: (
          <PrivateRoute>
            <MyTask></MyTask>
          </PrivateRoute>
        ),
      },
    ],
  },

   // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Worker Dashboard Routes
      {
        path: 'taskList',
        element: <PrivateRoute><TaskList></TaskList></PrivateRoute>
      },
      {
        path: 'MySubmissions',
        element: <PrivateRoute><MySubmissions></MySubmissions></PrivateRoute>
      },
      {
        path: 'withdrawals',
        element: <PrivateRoute><Withdrawals></Withdrawals></PrivateRoute>
      },
      // Buyer Dashboard Routes
      {
        path: 'addNewTask',
        element: <PrivateRoute><AddNewTask></AddNewTask></PrivateRoute>
      },
      {
        path: 'myTask',
        element: <PrivateRoute><MyTask></MyTask></PrivateRoute>
      },
      {
        path: 'purchaseCoin',
        element: <PrivateRoute><PurchaseCoin></PurchaseCoin></PrivateRoute>
      },
      // Admin Dashboard Routes
      {
        path: 'manageUsers',
        element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
      },
      {
        path: 'manageTask',
        element: <PrivateRoute><ManageTask></ManageTask></PrivateRoute>
      }
    ],
  },

  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
]);

export default router;