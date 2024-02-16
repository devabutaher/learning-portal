import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const ProtectedRoute = ({ requireAuth, requireAdmin, children }) => {
  const user = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAuth && user?.role !== "student") {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
