import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Plus,
  Calendar,
  History,
  MessageSquare,
  DollarSign,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";

const BASE_URL = "http://localhost:5000/api";

const styles = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    overflow: "hidden",
    fontFamily: "'Inter', Arial, sans-serif",
    backgroundColor: "#f5f9ff",
    position: "absolute",
    top: 0,
    left: 0,
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#ffffff",
    color: "#1a3c6e",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    boxShadow: "4px 0 12px rgba(0,0,0,0.08)",
  },
  sidebarTop: {
    flexGrow: 1,
  },
  sidebarTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "20px",
    borderBottom: "2px solid #e6f0ff",
    paddingBottom: "12px",
    color: "#1a3c6e",
  },
  serviceList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  serviceItem: {
    marginBottom: "8px",
    cursor: "pointer",
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#1a3c6e",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "1rem",
    transition: "background-color 0.2s, color 0.2s",
  },
  logoutButton: {
    padding: "12px 16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "24px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  mainContent: {
    marginLeft: "260px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflowY: "auto",
  },
  header: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "20px 24px",
    fontSize: "1.6rem",
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  profileName: {
    fontSize: "1rem",
    fontWeight: "500",
  },
  profileImage: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #ffffff",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  profileImageHover: {
    transform: "scale(1.05)",
    boxShadow: "0 0 8px rgba(255,255,255,0.5)",
  },
  contentArea: {
    padding: "24px",
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    padding: "24px",
  },
  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
  },
  cardActions: {
    marginTop: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  actionButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  editButton: {
    backgroundColor: "#10b981",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    color: "white",
  },
  profileForm: {
    background: "#ffffff",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "24px auto",
    border: "1px solid #e6f0ff",
  },
  profileFormHeader: {
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#1a3c6e",
    marginBottom: "24px",
    textAlign: "center",
  },
  formGroup: {
    marginBottom: "20px",
  },
  formLabel: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#1a3c6e",
    fontSize: "0.95rem",
  },
  formInput: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1e0ff",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "#f8fbff",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  formInputFocus: {
    borderColor: "#2563eb",
    boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)",
    outline: "none",
  },
  fileInput: {
    padding: "10px",
    border: "1px solid #d1e0ff",
    borderRadius: "8px",
    backgroundColor: "#f8fbff",
    cursor: "pointer",
  },
  submitButton: {
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    width: "100%",
    transition: "background-color 0.2s",
  },
  submitButtonHover: {
    backgroundColor: "#1d4ed8",
  },
  errorMessage: {
    color: "#ef4444",
    fontSize: "0.9rem",
    marginBottom: "16px",
    textAlign: "center",
  },
  successMessage: {
    color: "#10b981",
    fontSize: "0.9rem",
    marginBottom: "16px",
    textAlign: "center",
  },
  loadingMessage: {
    color: "#2563eb",
    fontSize: "1.1rem",
    textAlign: "center",
    padding: "24px",
  },
};

const ProfileManagement = ({ onProfileUpdate, initialProfile, onBackToDashboard }) => {
  const [profile, setProfile] = useState(
    initialProfile || {
      name: "",
      email: "",
      phone: "",
      status: "",
      profileImage: "",
    }
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setError("Please select a valid image file (JPG or PNG)");
        e.target.value = "";
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        e.target.value = "";
        return;
      }
      setProfile((prev) => ({ ...prev, profileImage: file }));
      setError("");
      setSuccess("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.name?.trim()) {
      setError("Name is required");
      return;
    }

    if (!profile.email?.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("name", profile.name.trim());
      formData.append("email", profile.email.trim());
      formData.append("phone", profile.phone.trim());
      formData.append("status", profile.status.trim());

      if (password.trim()) {
        formData.append("password", password.trim());
      }

      if (profile.profileImage instanceof File) {
        formData.append("profileImage", profile.profileImage);
      }

      console.log("Sending profile update request...");

      const res = await fetch(`${BASE_URL}/provider/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log("Profile update response:", data);

      if (!res.ok) {
        if (res.status === 401) {
          setError("Unauthorized: Invalid or expired token. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else if (res.status === 404) {
          setError("Profile not found. Please contact support.");
        } else if (res.status === 400) {
          setError(data.msg || data.error || "Bad request. Please check your input.");
        } else {
          setError(data.msg || "Failed to update profile. Please try again.");
        }
        return;
      }

      setSuccess("Profile updated successfully!");
      setPassword("");

      if (onProfileUpdate && data.provider) {
        onProfileUpdate(data.provider);
      }

      if (data.provider) {
        setProfile({
          name: data.provider.name || "",
          email: data.provider.email || "",
          phone: data.provider.phone || "",
          status: data.provider.status || "",
          profileImage: data.provider.profileImage || "",
        });
      }

      if (onBackToDashboard) {
        setTimeout(() => {
          onBackToDashboard();
          setSuccess("");
        }, 1000);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.profileForm}>
      <h2 style={styles.profileFormHeader}>Manage Your Profile</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      {success && <p style={styles.successMessage}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Full Name *</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            style={styles.formInput}
            placeholder="Enter your full name"
            required
            disabled={isSubmitting}
            onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: "#d1e0ff", boxShadow: "none" })}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email Address *</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            style={styles.formInput}
            placeholder="Enter your email address"
            required
            disabled={isSubmitting}
            onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: "#d1e0ff", boxShadow: "none" })}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            style={styles.formInput}
            placeholder="Enter your phone number"
            disabled={isSubmitting}
            onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: "#d1e0ff", boxShadow: "none" })}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Status</label>
          <input
            type="text"
            name="status"
            value={profile.status}
            onChange={handleChange}
            style={styles.formInput}
            placeholder="Enter your status"
            disabled={isSubmitting}
            onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: "#d1e0ff", boxShadow: "none" })}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>New Password (leave blank to keep current)</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            style={styles.formInput}
            placeholder="Enter new password"
            disabled={isSubmitting}
            onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: "#d1e0ff", boxShadow: "none" })}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Profile Image (JPG/PNG, max 5MB)</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
            style={styles.fileInput}
            disabled={isSubmitting}
          />
          {profile.profileImage && typeof profile.profileImage === "string" && (
            <div style={{ marginTop: "12px", textAlign: "center" }}>
              <img
                src={profile.profileImage}
                alt="Profile Preview"
                style={{
                  ...styles.profileImage,
                  width: "80px",
                  height: "80px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <p style={{ fontSize: "0.8rem", color: "#6b7280", marginTop: "4px" }}>
                Current profile image
              </p>
            </div>
          )}
        </div>
        <button
          type="submit"
          style={{
            ...styles.submitButton,
            backgroundColor: isSubmitting ? "#9ca3af" : "#2563eb",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
          disabled={isSubmitting}
          onMouseOver={(e) => !isSubmitting && Object.assign(e.target.style, styles.submitButtonHover)}
          onMouseOut={(e) => !isSubmitting && Object.assign(e.target.style, { backgroundColor: "#2563eb" })}
        >
          {isSubmitting ? "Updating..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

const AddServiceForm = ({ onAdd, onUpdate }) => (
  <div style={styles.contentArea}>
    <h2>Add New Service</h2>
    <p>Service form component would go here...</p>
  </div>
);

const ManageBookings = () => (
  <div style={styles.contentArea}>
    <h2>Manage Bookings</h2>
    <p>Bookings management component would go here...</p>
  </div>
);

const ServiceHistory = () => (
  <div style={styles.contentArea}>
    <h2>Service History</h2>
    <p>Service history component would go here...</p>
  </div>
);

const Messages = () => (
  <div style={styles.contentArea}>
    <h2>Messages</h2>
    <p>Messages component would go here...</p>
  </div>
);

const EarningsReport = () => (
  <div style={styles.contentArea}>
    <h2>Earnings Report</h2>
    <p>Earnings report component would go here...</p>
  </div>
);

const Support = () => (
  <div style={styles.contentArea}>
    <h2>Support</h2>
    <p>Support component would go here...</p>
  </div>
);

const providerServices = [
  { name: "Dashboard Home", component: null, icon: <Home size={18} /> },
  { name: "Add New Service", component: AddServiceForm, icon: <Plus size={18} /> },
  { name: "Manage Bookings", component: ManageBookings, icon: <Calendar size={18} /> },
  { name: "Service History", component: ServiceHistory, icon: <History size={18} /> },
  { name: "Messages", component: Messages, icon: <MessageSquare size={18} /> },
  { name: "Earnings Report", component: EarningsReport, icon: <DollarSign size={18} /> },
  { name: "Support", component: Support, icon: <HelpCircle size={18} /> },
  { name: "Manage Profile", component: ProfileManagement, icon: <User size={18} /> },
];

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    profileImage: "",
  });
  const [error, setError] = useState("");
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect running for fetchServices and fetchProfile");

    const fetchServices = async () => {
      try {
        setIsLoadingServices(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in.");
          navigate("/login");
          return;
        }
        const res = await fetch(`${BASE_URL}/provider/dashboard/services`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          if (res.status === 401) {
            setError("Unauthorized: Invalid or expired token. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            setError("Failed to fetch services. Please try again.");
          }
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (data.success) {
          setCards(data.services || []);
          setError("");
        } else {
          setError(data.msg || "Failed to fetch services.");
        }
      } catch (error) {
        console.error("Failed to fetch provider services:", error.message);
        setError("An error occurred while fetching services.");
      } finally {
        setIsLoadingServices(false);
      }
    };

    const fetchProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found. Please log in.");
          navigate("/login");
          return;
        }
        console.log("Fetching profile with token:", token);
        const res = await fetch(`${BASE_URL}/provider/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          console.log("Error response body:", errorData);
          if (res.status === 401) {
            setError("Unauthorized: Invalid or expired token. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
          } else if (res.status === 404) {
            setError("Profile endpoint not found or user does not exist. Contact support.");
            console.log("Attempted to fetch profile from:", `${BASE_URL}/provider/profile`);
          } else {
            setError("Failed to fetch profile. Please try again.");
          }
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Profile data received:", data);
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          status: data.status || "",
          profileImage: data.profileImage || "",
        });
        setError("");
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
        setError("An error occurred while fetching your profile.");
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchServices();
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (index, serviceId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        navigate("/login");
        return;
      }
      const res = await fetch(`${BASE_URL}/provider/dashboard/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (res.status === 401) {
          setError("Unauthorized: Invalid or expired token. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to delete service. Please try again.");
        }
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const updatedCards = [...cards];
      updatedCards.splice(index, 1);
      setCards(updatedCards);
      setError("");
    } catch (error) {
      console.error("Failed to delete service:", error.message);
      setError("An error occurred while deleting the service.");
    }
  };

  const handleEdit = (index) => {
    const serviceId = cards[index]._id;
    navigate(`/add-service/${serviceId}`);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setError("");
  };

  const handleAddService = (newService) => {
    setCards((prevCards) => [...prevCards, newService]);
    setSelectedService(null);
    navigate("/dashboard");
  };

  const handleUpdateService = (updatedService) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card._id === updatedService._id ? updatedService : card))
    );
    setSelectedService(null);
    navigate("/dashboard");
  };

  const handleProfileUpdate = (updatedProfile) => {
    console.log("Profile updated in parent:", updatedProfile);
    setProfile({
      name: updatedProfile.name || "",
      email: updatedProfile.email || "",
      phone: updatedProfile.phone || "",
      status: updatedProfile.status || "",
      profileImage: updatedProfile.profileImage || "",
    });
  };

  const handleBackToDashboard = () => {
    setSelectedService(null);
  };

  const renderContent = () => (
    !selectedService || selectedService.component === null ? (
      <section style={styles.cards}>
        {isLoadingServices && <p style={styles.loadingMessage}>Loading services...</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}
        {!isLoadingServices && cards.length === 0 ? (
          <p style={{ padding: "24px", fontSize: "1.1rem", color: "#6b7280", textAlign: "center" }}>
            No services found. Please add your first service.
          </p>
        ) : (
          cards.map((card, index) => (
            <div
              key={card._id}
              style={styles.card}
              onMouseOver={(e) =>
                Object.assign(e.currentTarget.style, {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
                })
              }
              onMouseOut={(e) =>
                Object.assign(e.currentTarget.style, {
                  transform: "scale(1)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                })
              }
            >
              <h3
                style={{
                  color: "#1a3c6e",
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                {card.serviceName || card.title || card.category}
              </h3>
              <p style={{ color: "#4b5e8e", lineHeight: "1.5" }}>
                <strong>Description:</strong> {card.description}
              </p>
              {card.price && (
                <p style={{ color: "#4b5e8e" }}>
                  <strong>Price:</strong> ₹{card.price}
                </p>
              )}
              {card.category && (
                <p style={{ color: "#4b5e8e" }}>
                  <strong>Category:</strong> {card.category}
                </p>
              )}
              {card.availableDays?.length > 0 && (
                <p style={{ color: "#4b5e8e" }}>
                  <strong>Available Days:</strong> {card.availableDays.join(", ")}
                </p>
              )}
              {card.location && (
                <p style={{ color: "#4b5e8e" }}>
                  <strong>Location:</strong> {card.location}
                </p>
              )}
              {card.status && (
                <p style={{ color: "#4b5e8e" }}>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        card.status === "approved"
                          ? "#10b981"
                          : card.status === "pending"
                          ? "#f59e0b"
                          : "#ef4444",
                      fontWeight: "600",
                    }}
                  >
                    {card.status.toUpperCase()}
                  </span>
                </p>
              )}
              <div style={styles.cardActions}>
                <button
                  style={{ ...styles.actionButton, ...styles.editButton }}
                  onClick={() => handleEdit(index)}
                  onMouseOver={(e) => Object.assign(e.target.style, { backgroundColor: "#059669" })}
                  onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: "#10b981" })}
                >
                  ✏️ Edit
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onClick={() => handleDelete(index, card._id)}
                  onMouseOver={(e) => Object.assign(e.target.style, { backgroundColor: "#dc2626" })}
                  onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: "#ef4444" })}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    ) : (
      <section style={styles.contentArea}>
        {selectedService.component === AddServiceForm ? (
          <selectedService.component
            onAdd={handleAddService}
            onUpdate={handleUpdateService}
          />
        ) : selectedService.component === ProfileManagement ? (
          <selectedService.component
            onProfileUpdate={handleProfileUpdate}
            initialProfile={profile}
            onBackToDashboard={handleBackToDashboard}
          />
        ) : (
          <selectedService.component />
        )}
      </section>
    )
  );

  return (
    <div style={styles.dashboard}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.sidebarTitle}>Provider Services</div>
          <ul style={styles.serviceList}>
            {providerServices.map((service, index) => (
              <li
                key={index}
                style={{
                  ...styles.serviceItem,
                  backgroundColor: selectedService?.name === service.name ? "#e6f0ff" : "transparent",
                  color: selectedService?.name === service.name ? "#2563eb" : "#1a3c6e",
                }}
                onClick={() => handleServiceClick(service)}
                onMouseOver={(e) =>
                  Object.assign(e.currentTarget.style, {
                    backgroundColor: "#e6f0ff",
                    color: "#2563eb",
                  })
                }
                onMouseOut={(e) =>
                  Object.assign(e.currentTarget.style, {
                    backgroundColor: selectedService?.name === service.name ? "#e6f0ff" : "transparent",
                    color: selectedService?.name === service.name ? "#2563eb" : "#1a3c6e",
                  })
                }
              >
                {service.icon}
                <span>{service.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          style={styles.logoutButton}
          onClick={handleLogout}
          onMouseOver={(e) => Object.assign(e.target.style, { backgroundColor: "#1d4ed8" })}
          onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: "#2563eb" })}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.header}>
          <span>
            <strong>Provider</strong> Dashboard
          </span>
          <div style={styles.profileContainer}>
            {isLoadingProfile ? (
              <p style={{ color: "#ffffff", margin: 0 }}>Loading...</p>
            ) : profile.name ? (
              <span style={styles.profileName}>{profile.name}</span>
            ) : null}
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                style={styles.profileImage}
                onMouseOver={(e) => Object.assign(e.target.style, styles.profileImageHover)}
                onMouseOut={(e) =>
                  Object.assign(e.target.style, {
                    transform: "scale(1)",
                    boxShadow: "none",
                  })
                }
              />
            ) : (
              <User
                size={28}
                style={{
                  borderRadius: "50%",
                  padding: "8px",
                  backgroundColor: "#ffffff",
                  color: "#2563eb",
                  border: "3px solid #ffffff",
                }}
              />
            )}
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;