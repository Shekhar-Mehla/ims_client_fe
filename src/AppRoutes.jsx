import { Routes, Route } from "react-router";
import Login from "./pages/authPages/Login";
import DefaultLayout from "./components/CustomComponents/DefaultLayout";
import ProtectedRoute from "./components/CustomComponents/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/authPages/Register";
import VarifyUser from "./pages/authPages/VarifyUser";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import InternshipList from "./pages/internship/InternshipList";
import Intership from "./pages/internship/Intership";
import ApplicationFormPage from "./pages/ApplicationFormPage";
import ProfilePage from "./pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout></DefaultLayout>}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route
          path="email-verified"
          element={<VarifyUser></VarifyUser>}
        ></Route>
        <Route
          path="internships"
          element={<InternshipList></InternshipList>}
        ></Route>
        <Route
          path="internship/:slug"
          element={<Intership></Intership>}
        ></Route>
        <Route
          path="/internship/:slug/apply"
          element={
            <ProtectedRoute>
              <ApplicationFormPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
