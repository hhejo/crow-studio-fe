import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("access-token");

  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
