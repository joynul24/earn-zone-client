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
