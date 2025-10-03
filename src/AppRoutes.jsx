import React from "react";
import { Routes, Route } from "react-router";
import Login from "./pages/authPages/Login";
import DefaultLayout from "./components/CustomComponents/DefaultLayout";
import Home from "./pages/Home";
import Register from "./pages/authPages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout></DefaultLayout>}>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="home" element={<Home></Home>}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
