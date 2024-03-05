import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user.value);
  if (isLoggedIn) return children;
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
