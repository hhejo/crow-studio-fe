import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.user.value);
  useEffect(() => {
    console.log("Private Route");
  }, []);
  if (isLoggedIn) return <Outlet />;
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
