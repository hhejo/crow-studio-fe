import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { auth } from "./firebase";
import { setCurrentUser } from "./redux/user-slice";
import ProtectedRoute from "./route/ProtectedRoute";
import PrivateRoute from "./route/PrivateRoute";
import Intro from "./pages/intro";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Mypage from "./pages/mypage";
import Teams from "./pages/teams/Teams";
import TeamCreate from "./pages/team-create/TeamCreate";
import TeamDetail from "./pages/team-detail/TeamDetail";
import Project from "./pages/project/Project";
import NotFound from "./pages/not-found/NotFound";
import Forbidden from "./pages/forbidden/Forbidden";
import YMonaco from "./pages/code-share/YMonaco";
// import Redirect from "./pages/redirect/Redirect";
import WithLoading from "./components/WithLoading";

// router
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
  { path: "/project/code-share", element: <YMonaco /> },
  { path: "/403", element: <Forbidden /> },
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <NotFound /> },
  // { path: "/redirect", element: <Redirect /> },
]);

// App
function App() {
  const dispatch = useDispatch();
  AOS.init();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) dispatch(setCurrentUser(user)); // 로그인 된 상태이면 로그인 유저 정보를 Redux에 저장
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
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
    </>
  );
}

export default App;
