import { Routes, Route } from "react-router";
import Login from "./pages/authPages/Login";
import DefaultLayout from "./components/CustomComponents/DefaultLayout";
import Home from "./pages/Home";
import Register from "./pages/authPages/Register";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Intership from "./pages/Intership";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout></DefaultLayout>}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="internships" element={<Intership></Intership>}></Route>
        <Route
          path="forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
