import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { isFetched, isLoggedIn } = useSelector((state) => state.user.value);
  useEffect(() => {
    console.log(`Private Route, isLoggedIn:${isLoggedIn}`);
  }, []);
  if (isLoggedIn) return <Outlet />;
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
