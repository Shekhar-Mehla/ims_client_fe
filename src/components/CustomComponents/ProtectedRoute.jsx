import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const isAuthenticated = useSelector((state) => state.userInfo?.users?._id);
  const { user, loading } = useSelector((state) => state.userInfo);
  const isAuthenticated = Boolean(user?._id);

  const location = useLocation();
  

  // if (loading) {
  //   return <div>Loading...</div>; // a spinner is even better
  // }

  if (!isAuthenticated) {
    // Redirect to login with return URL
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?returnUrl=${returnUrl}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
