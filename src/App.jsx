import React from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import Login from "./pages/authPages/Login";
import AppRoutes from "./AppRoutes";
const App = () => {
  return (
    <div className="w-screen h-screen ">
      <AppRoutes></AppRoutes>
    </div>
  );
};

export default App;
