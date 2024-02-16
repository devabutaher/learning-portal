import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./component/Navbar";
import Course from "./pages/Course";
import Home from "./pages/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/course",
          element: <Course />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
