import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.user.value);
  useEffect(() => {
    console.log("Protected Route");
  }, []);
  if (isLoggedIn) return <Navigate to="/teams" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
