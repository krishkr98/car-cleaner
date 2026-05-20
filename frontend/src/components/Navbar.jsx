import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl">🚿</span>
        <span className="font-bold text-gray-900 text-sm tracking-tight">
          CAR CLEANERS
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {!user && (
          <>
            <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="/pricing" className="text-sm text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link to="/login" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</Link>
            <Link to="/register" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">Register</Link>
          </>
        )}

        {user?.role === "customer" && (
          <>
            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-blue-600">Dashboard</Link>
            <Link to="/cars" className="text-sm text-gray-600 hover:text-blue-600">My Cars</Link>
            <Link to="/subscription" className="text-sm text-gray-600 hover:text-blue-600">Subscription</Link>
            <Link to="/history" className="text-sm text-gray-600 hover:text-blue-600">History</Link>
            <Link to="/notifications" className="text-sm text-gray-600 hover:text-blue-600">Alerts</Link>
            <button onClick={handleLogout} className="text-sm bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">Logout</button>
          </>
        )}

        {user?.role === "employee" && (
          <>
            <Link to="/employee/tasks" className="text-sm text-gray-600 hover:text-blue-600">My Tasks</Link>
            <Link to="/employee/completed" className="text-sm text-gray-600 hover:text-blue-600">Completed</Link>
            <Link to="/employee/profile" className="text-sm text-gray-600 hover:text-blue-600">Profile</Link>
            <button onClick={handleLogout} className="text-sm bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;