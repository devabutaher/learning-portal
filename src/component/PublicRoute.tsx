import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const PublicRoute = ({ children }) => {
  const user = useAuth();

  if (user?.role === "student") {
    return <Navigate to="/course-video/1" />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;
