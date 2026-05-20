import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/customer/Dashboard";
import Cars from "./pages/customer/Cars";
import Subscription from "./pages/customer/Subscription";
import History from "./pages/customer/History";
import Notifications from "./pages/customer/Notifications";

import Tasks from "./pages/employee/Tasks";
import Completed from "./pages/employee/Completed";
import Profile from "./pages/employee/Profile";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Customer */}
          <Route path="/dashboard" element={
            <ProtectedRoute role="customer">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/cars" element={
            <ProtectedRoute role="customer">
              <Cars />
            </ProtectedRoute>
          } />
          <Route path="/subscription" element={
            <ProtectedRoute role="customer">
              <Subscription />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute role="customer">
              <History />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute role="customer">
              <Notifications />
            </ProtectedRoute>
          } />

          {/* Employee */}
          <Route path="/employee/tasks" element={
            <ProtectedRoute role="employee">
              <Tasks />
            </ProtectedRoute>
          } />
          <Route path="/employee/completed" element={
            <ProtectedRoute role="employee">
              <Completed />
            </ProtectedRoute>
          } />
          <Route path="/employee/profile" element={
            <ProtectedRoute role="employee">
              <Profile />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;