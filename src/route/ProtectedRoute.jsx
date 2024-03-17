import { useEffect } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const ProtectedRoute = () => {
  const { loggedIn } = useOutletContext();

  useEffect(() => {
    console.log(`Protected Route, loggedIn:${loggedIn}`);
  }, [loggedIn]);

  if (loggedIn) return <Navigate to="/teams" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
