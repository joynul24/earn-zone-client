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
        element: <TaskList></TaskList>,
        loader: async () => {
          return new Promise((resolve) =>
            setTimeout(() => resolve(null), 1000)
          );
        },
      },
      {
        path: "MySubmissions",
        element: <MySubmissions></MySubmissions>,
        loader: async () => {
          return new Promise((resolve) =>
            setTimeout(() => resolve(null), 1000)
          );
        },
      },
      // Buyer Role Route
      {
        path: "addNewTask",
        element: <AddNewTask></AddNewTask>
      },
      {
        path: "myTask",
        element: <MyTask></MyTask>
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
