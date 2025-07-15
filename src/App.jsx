import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import AddServiceForm from "./components/AddServiceForm";
import { Routes, Route } from "react-router-dom";
import EarningsReport  from "./pages/EarningsReport"
import ManageBookings from "./pages/ManageBookings";
import ServiceHistory from "./pages/ServiceHistory";
import Messages from "./pages/Messages";
// import EarningsReport from "./pages/EarningsReport";
import Support from "./pages/Support";
// import AddService from "./AddService"; 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/add-service" element={<AddServiceForm />} /> {/* ✅ Add this */}
      <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/" element={<Dashboard />} />
        {/* <Route path="/add-service" element={<AddService />} /> */}
        <Route path="/manage-bookings" element={<ManageBookings />} />
        <Route path="/service-history" element={<ServiceHistory />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/earnings-report" element={<EarningsReport />} />
        <Route path="/support" element={<Support />} />
    </Routes>
  );
}

export default App;
