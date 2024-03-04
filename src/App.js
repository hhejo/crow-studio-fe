import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { getUser } from "./redux/userSlice";

import ProtectedRoute from "./route/ProtectedRoute";
import PrivateRoute from "./route/PrivateRoute";

import Intro from "./pages/intro/Intro";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Mypage from "./pages/mypage/Mypage";
import Teams from "./pages/teams/Teams";
import TeamCreate from "./pages/team-create/TeamCreate";
import TeamDetail from "./pages/team-detail/TeamDetail";
import Project from "./pages/project/Project";
import NotFound from "./pages/not-found/NotFound";
import Forbidden from "./pages/forbidden/Forbidden";
import YMonaco from "./pages/code-share/YMonaco";
import Redirect from "./pages/redirect/Redirect";

const router = createBrowserRouter([
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
    path: "/mypage/:userSeq",
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
    path: "/teams/:teamSeq",
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
  {
    path: "/project/code-share",
    element: <YMonaco />,
  },
  {
    path: "/redirect",
    element: <Redirect />,
  },
  {
    path: "/403",
    element: <Forbidden />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.value.isLoggedIn);

  AOS.init();

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <React.Fragment>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        className="rounded-[10px] text-[16px]"
      />
    </React.Fragment>
  );
}

export default App;
