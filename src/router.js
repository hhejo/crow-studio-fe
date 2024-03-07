import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./route/ProtectedRoute";
import PrivateRoute from "./route/PrivateRoute";
import Intro from "./pages/intro";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Mypage from "./pages/mypage";
import Teams from "./pages/teams";
import TeamCreate from "./pages/team-create";
import TeamDetail from "./pages/team-detail";
import Project from "./pages/project/Project";
import NotFound from "./pages/not-found/NotFound";
import Forbidden from "./pages/forbidden/Forbidden";
import YMonaco from "./pages/code-share/YMonaco";
// import Redirect from "./pages/redirect/Redirect";
import WithLoading from "./components/WithLoading";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Intro />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <WithLoading>
          <Login />
        </WithLoading>
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectedRoute>
        <WithLoading>
          <Signup />
        </WithLoading>
      </ProtectedRoute>
    ),
  },
  {
    path: "/mypage/:uid",
    element: (
      <WithLoading>
        <Mypage />
      </WithLoading>
    ),
  },
  {
    path: "/teams",
    element: (
      <PrivateRoute>
        <WithLoading>
          <Teams />
        </WithLoading>
      </PrivateRoute>
    ),
  },
  {
    path: "/teams/:teamUid",
    element: (
      <PrivateRoute>
        <WithLoading>
          <TeamDetail />
        </WithLoading>
      </PrivateRoute>
    ),
  },
  {
    path: "/teams/create",
    element: (
      <PrivateRoute>
        <TeamCreate />
      </PrivateRoute>
    ),
  },
  {
    path: "/project/:teamSeq",
    element: (
      <PrivateRoute>
        <Project />
      </PrivateRoute>
    ),
  },
  { path: "/project/code-share", element: <YMonaco /> },
  { path: "/403", element: <Forbidden /> },
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <NotFound /> },
  // { path: "/redirect", element: <Redirect /> },
]);
