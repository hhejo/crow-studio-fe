import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.user.value);
  if (isLoggedIn) return <Outlet />;
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
