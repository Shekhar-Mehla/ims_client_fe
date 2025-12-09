import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const isAuthenticated = useSelector((state) => state.userInfo?.users?._id);
  const { users, loading } = useSelector((state) => state.userInfo);
  console.log(users);
  const isAuthenticated = Boolean(users?._id);
  console.log(isAuthenticated);
  const location = useLocation();
  console.log(location);

  // if (loading) {
  //   return <div>Loading...</div>; // a spinner is even better
  // }

  // if (isAuthenticated) {
  //   // Redirect to login with return URL
  //   const returnUrl = encodeURIComponent(location.pathname + location.search);
  //   return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
  // }

  // return children;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate state={{ from: location.pathname }} to="/login" />
  );
};

export default ProtectedRoute;
