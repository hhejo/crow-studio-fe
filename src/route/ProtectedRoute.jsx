import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.user.value);
  if (isLoggedIn) return <Navigate to="/teams" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
