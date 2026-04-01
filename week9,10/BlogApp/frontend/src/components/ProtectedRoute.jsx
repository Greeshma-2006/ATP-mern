import { useAuth } from "../store/authStore";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

  const { loading, currentUser, isAuthenticated } = useAuth();

  // ===== LOADING STATE =====
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ===== NOT LOGGED IN =====
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ===== ROLE CHECK =====
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ redirectTo: "/" }}
      />
    );
  }

  // ===== ALLOWED =====
  return children;
}

export default ProtectedRoute;