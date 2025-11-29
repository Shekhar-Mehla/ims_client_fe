import React from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import Login from "./pages/authPages/Login";
import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div className="w-screen h-screen ">
      <AppRoutes></AppRoutes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
