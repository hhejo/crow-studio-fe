import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const PrivateRoute = () => {
  const { loggedIn } = useOutletContext(); // Outlet으로 전달된 loggedIn
  // 로그인 되었으면 로그인 필요한 모든 서비스에 접근
  if (loggedIn) return <Outlet />;
  // 로그인 되지 않았으면 /intro로 리다이렉트
  return <Navigate to="/intro" replace />;
};

export default PrivateRoute;
