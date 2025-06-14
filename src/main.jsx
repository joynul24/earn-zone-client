import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from 'react-toastify';
import { UserCoinProvider } from "./components/shared/hooks/useUserCoin";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <AuthProvider>
    <UserCoinProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-right" />
    </UserCoinProvider>
    </AuthProvider>
  </StrictMode>
);
