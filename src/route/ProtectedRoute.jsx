import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("access-token");

  if (isLoggedIn) {
    return <Navigate to="/teams" replace />;
  }
  return children;
};

export default ProtectedRoute;
