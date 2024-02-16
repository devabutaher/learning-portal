import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const PublicRoute = ({ children }) => {
  const auth = useAuth();

  if (auth?.role === "user") {
    return <Navigate to="/course-player" />;
  }

  if (auth?.role === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;
