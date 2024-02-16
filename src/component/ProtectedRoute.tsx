import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";

const ProtectedRoute = ({ requireAuth, requireAdmin, children }) => {
  const user = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAuth && user?.role !== "student") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
