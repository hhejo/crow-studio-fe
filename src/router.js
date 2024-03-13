import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
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
import Root from "./Root";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/* 로그인 X */}
      <Route element={<ProtectedRoute />}>
        <Route path="intro" element={<Intro />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
      {/* 로그인 O */}
      <Route element={<PrivateRoute />}>
        <Route path="mypage/:uid" element={<Mypage />} />
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:teamDocId" element={<TeamDetail />} />
        <Route path="teams/create" element={<TeamCreate />} />
        <Route path="project/:teamDocId" element={<Project />} />
      </Route>
    </Route>
  )
);

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     children: [
//       {
//         path: "intro",
//         element: <Intro />,
//       },
//       {
//         path: "signup",
//         element: <Signup />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "mypage/:uid",
//         element: <Mypage />,
//       },
//       {
//         path: "teams",
//         element: <Teams />,
//       },
//       {
//         path: "teams/:teamDocId",
//         element: <TeamDetail />,
//       },
//       {
//         path: "teams/create",
//         element: <TeamCreate />,
//       },
//       {
//         path: "project/:teamDocId",
//         element: <Project />,
//       },
//     ],
//   },
//   // {
//   //   path: "/login",
//   //   element: (
//   //     <ProtectedRoute>
//   //       <WithLoading>
//   //         <Login />
//   //       </WithLoading>
//   //     </ProtectedRoute>
//   //   ),
//   // },
//   // {
//   //   path: "/signup",
//   //   element: (
//   //     <ProtectedRoute>
//   //       <WithLoading>
//   //         <Signup />
//   //       </WithLoading>
//   //     </ProtectedRoute>
//   //   ),
//   // },
//   // {
//   //   path: "/mypage/:uid",
//   //   element: (
//   //     <WithLoading>
//   //       <Mypage />
//   //     </WithLoading>
//   //   ),
//   // },
//   // {
//   //   path: "/teams",
//   //   element: (
//   //     <PrivateRoute>
//   //       <WithLoading>
//   //         <Teams />
//   //       </WithLoading>
//   //     </PrivateRoute>
//   //   ),
//   // },
//   // {
//   //   path: "/teams/:teamDocId",
//   //   element: (
//   //     <PrivateRoute>
//   //       <WithLoading>
//   //         <TeamDetail />
//   //       </WithLoading>
//   //     </PrivateRoute>
//   //   ),
//   // },
//   // {
//   //   path: "/teams/create",
//   //   element: (
//   //     <PrivateRoute>
//   //       <TeamCreate />
//   //     </PrivateRoute>
//   //   ),
//   // },
//   // {
//   //   path: "/project/:teamSeq",
//   //   element: (
//   //     <PrivateRoute>
//   //       <Project />
//   //     </PrivateRoute>
//   //   ),
//   // },
//   // { path: "/project/code-share", element: <YMonaco /> },
//   // { path: "/403", element: <Forbidden /> },
//   // { path: "/404", element: <NotFound /> },
//   // { path: "*", element: <NotFound /> },
//   // { path: "/redirect", element: <Redirect /> },
// ]);
