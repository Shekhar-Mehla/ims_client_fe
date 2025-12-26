import React from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import Login from "./pages/authPages/Login";
import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "./socket";
const App = () => {
  const { application } = useSelector((state) => state.applicationInfo);
  console.log(application?.profileId?.authId?.toString());
  useEffect(() => {
    if (application?.profileId?.authId?.toString()) {
      // socket connection
      socket.connect();
      // join user to socket room
      socket.emit("join", application?.profileId?.authId?.toString());
      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });
    }
  }, [application]);
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
