import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./app/store";
import CoursePlayer from "./component/CoursePlayer";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import RequireAuth from "./component/RequireAuth";

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
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "course-player",
          element: (
            <RequireAuth requireAuth>
              <CoursePlayer />
            </RequireAuth>
          ),
        },
        {
          path: "dashboard",
          element: (
            <RequireAuth requireAdmin>
              <Dashboard />
            </RequireAuth>
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
