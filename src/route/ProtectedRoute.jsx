import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user.value);
  if (isLoggedIn) return <Navigate to="/teams" replace />;
  return children;
};

export default ProtectedRoute;
