import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useOutletContext } from "react-router-dom";

const ProtectedRoute = () => {
  // const { isLoggedIn } = useSelector((state) => state.user.value);
  const { isLoggedIn } = useOutletContext();
  useEffect(() => {
    console.log(`Protected Route, isLoggedIn:${isLoggedIn}`);
  }, [isLoggedIn]);
  if (isLoggedIn) return <Navigate to="/teams" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
