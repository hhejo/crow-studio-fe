import { useEffect } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const PrivateRoute = () => {
  const { loggedIn } = useOutletContext();

  useEffect(() => {
    console.log(`Private Route, isLoggedIn:${loggedIn}`);
  }, [loggedIn]);

  if (loggedIn) return <Outlet />;
  return <Navigate to="/intro" replace />;
};

export default PrivateRoute;
