// src/App.jsx
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import ManageBookings from "./pages/ManageBookings";
import ServiceHistory from "./pages/ServiceHistory";
import Messages from "./pages/Messages";
import EarningsReport from "./pages/EarningsReport";
import Support from "./pages/Support";
import AddServicePage from "./pages/AddServicePage";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import the wrapper

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-service"
        element={
          <ProtectedRoute>
            <AddServicePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-service/:serviceId"
        element={
          <ProtectedRoute>
            <AddServicePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-bookings"
        element={
          <ProtectedRoute>
            <ManageBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/service-history"
        element={
          <ProtectedRoute>
            <ServiceHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/earnings-report"
        element={
          <ProtectedRoute>
            <EarningsReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
