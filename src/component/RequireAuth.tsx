import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";

const RequireAuth = ({ requireAuth, requireAdmin, children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAuth && auth?.role !== "user") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && auth?.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
