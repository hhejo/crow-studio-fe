import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useOutletContext } from "react-router-dom";

const PrivateRoute = () => {
  // const { isFetched, isLoggedIn } = useSelector((state) => state.user.value);
  const { isLoggedIn } = useOutletContext();
  useEffect(() => {
    console.log(`Private Route, isLoggedIn:${isLoggedIn}`);
  }, [isLoggedIn]);
  if (isLoggedIn) return <Outlet />;
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
