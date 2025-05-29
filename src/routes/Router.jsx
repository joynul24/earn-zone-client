import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import ContactUs from "../pages/ContactUs/ContactUs";
import ErrorPage from "../components/shared/ErrorPage/ErrorPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

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
      {
        path: "contactUs",
        element: <ContactUs></ContactUs>,
        loader: async () => {
          return new Promise((resolve) =>
            setTimeout(() => resolve(null), 1000)
          );
        },
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
