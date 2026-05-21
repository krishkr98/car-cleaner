import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    if (user.role === "admin") return <Navigate to="/admin" />;
    if (user.role === "employee") return <Navigate to="/employee/tasks" />;
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;