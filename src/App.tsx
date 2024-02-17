import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./app/store";
import Assignment from "./component/Assignment";
import AssignmentMark from "./component/AssignmentMark";
import CoursePlayer from "./component/CoursePlayer";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import LeaderBoard from "./component/LeaderBoard";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import Quiz from "./component/Quiz";
import Quizzes from "./component/Quizzes";
import Register from "./component/Register";
import Videos from "./component/Videos";

const App = () => {
  const routes = [
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        { path: "/", element: <Home /> },
        {
          path: "login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "register",
          element: (
            <PublicRoute>
              <Register />
            </PublicRoute>
          ),
        },
        {
          path: "course-video/:id",
          element: (
            <ProtectedRoute requireAuth>
              <CoursePlayer />
            </ProtectedRoute>
          ),
        },
        {
          path: "leaderboard",
          element: (
            <ProtectedRoute requireAuth>
              <LeaderBoard />
            </ProtectedRoute>
          ),
        },
        {
          path: "quiz/:id",
          element: (
            <ProtectedRoute requireAuth>
              <Quiz />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute requireAdmin>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "assignment",
          element: (
            <ProtectedRoute requireAdmin>
              <Assignment />
            </ProtectedRoute>
          ),
        },
        {
          path: "assignment-mark",
          element: (
            <ProtectedRoute requireAdmin>
              <AssignmentMark />
            </ProtectedRoute>
          ),
        },
        {
          path: "quizzes",
          element: (
            <ProtectedRoute requireAdmin>
              <Quizzes />
            </ProtectedRoute>
          ),
        },
        {
          path: "videos",
          element: (
            <ProtectedRoute requireAdmin>
              <Videos />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
