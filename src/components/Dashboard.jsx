import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import ManageBookings from "../pages/ManageBookings";
import ServiceHistory from "../pages/ServiceHistory";
import Messages from "../pages/Messages";
import EarningsReport from "../pages/EarningsReport";
import Support from "../pages/Support";
import AddServiceForm from "../components/AddServiceForm";

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
};

const ProfileManagement = ({ onProfileUpdate }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
        onProfileUpdate({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/provider-services/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profile),
      });
      onProfileUpdate(profile);
    } catch (error) {
      console.error("Failed to update profile:", error.message);
    }
  };

  return (
    <div style={styles.profileForm}>
      <h2 style={styles.profileFormHeader}>Manage Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            style={styles.formInput}
            placeholder="Enter your full name"
            onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: "#d1e0ff", boxShadow: "none" })}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email Address</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            style={styles.formInput}
            placeholder="Enter your email address"
            onFocus={(e) => Object.assign(e.target.style, styles.formInputFocus)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: "#d1e0ff", boxShadow: "none" })}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          {profile.profilePicture && (
            <img
              src={profile.profilePicture}
              alt="Profile Preview"
              style={{
                ...styles.profileImage,
                marginTop: "12px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          )}
        </div>
        <button
          type="submit"
          style={styles.submitButton}
          onMouseOver={(e) => Object.assign(e.target.style, styles.submitButtonHover)}
          onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: "#2563eb" })}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

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
    profilePicture: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${BASE_URL}/provider-services/dashboard/services`, {
          credentials: "include",
        });
        const data = await res.json();
        setCards(data.services || []);
      } catch (error) {
        console.error("Failed to fetch provider services:", error.message);
      }
    };

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/provider-services/profile`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setProfile(data.profile || {});
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
      }
    };

    fetchServices();
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (index, serviceId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BASE_URL}/provider-services/dashboard/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const updatedCards = [...cards];
      updatedCards.splice(index, 1);
      setCards(updatedCards);
    } catch (error) {
      console.error("Failed to delete service:", error.message);
    }
  };

  const handleEdit = (index) => {
    const serviceId = cards[index]._id;
    navigate(`/add-service/${serviceId}`);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
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
    setProfile(updatedProfile);
    setSelectedService(null);
    navigate("/dashboard");
  };

  const renderContent = () => (
    !selectedService || selectedService.component === null ? (
      <section style={styles.cards}>
        {cards.length === 0 ? (
          <p style={{ padding: "24px", fontSize: "1.1rem", color: "#6b7280", textAlign: "center" }}>
            No services found. Please add your first service.
          </p>
        ) : (
          cards.map((card, index) => (
            <div
              key={card._id}
              style={styles.card}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, {
                transform: "scale(1.02)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
              })}
              onMouseOut={(e) => Object.assign(e.currentTarget.style, {
                transform: "scale(1)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              })}
            >
              <h3 style={{ color: "#1a3c6e", marginBottom: "10px", fontSize: "1.2rem", fontWeight: "600" }}>
                {card.serviceName || card.title || card.category}
              </h3>
              <p style={{ color: "#4b5e8e", lineHeight: "1.5" }}><strong>Description:</strong> {card.description}</p>
              {card.price && <p style={{ color: "#4b5e8e" }}><strong>Price:</strong> ₹{card.price}</p>}
              {card.category && <p style={{ color: "#4b5e8e" }}><strong>Category:</strong> {card.category}</p>}
              {card.availableDays?.length > 0 && (
                <p style={{ color: "#4b5e8e" }}><strong>Available Days:</strong> {card.availableDays.join(", ")}</p>
              )}
              {card.location && <p style={{ color: "#4b5e8e" }}><strong>Location:</strong> {card.location}</p>}
              {card.status && (
                <p style={{ color: "#4b5e8e" }}>
                  <strong>Status:</strong>{" "}
                  <span style={{
                    color: card.status === "approved" ? "#10b981" :
                          card.status === "pending" ? "#f59e0b" : "#ef4444",
                    fontWeight: "600",
                  }}>
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
          <selectedService.component onProfileUpdate={handleProfileUpdate} />
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
                style={styles.serviceItem}
                onClick={() => handleServiceClick(service)}
                onMouseOver={(e) => Object.assign(e.currentTarget.style, {
                  backgroundColor: "#e6f0ff",
                  color: "#2563eb",
                })}
                onMouseOut={(e) => Object.assign(e.currentTarget.style, {
                  backgroundColor: "transparent",
                  color: "#1a3c6e",
                })}
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
          <span><strong>Provider</strong> Dashboard</span>
          <div style={styles.profileContainer}>
            {profile.name && <span style={styles.profileName}>{profile.name}</span>}
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                style={styles.profileImage}
                onMouseOver={(e) => Object.assign(e.target.style, styles.profileImageHover)}
                onMouseOut={(e) => Object.assign(e.target.style, {
                  transform: "scale(1)",
                  boxShadow: "none",
                })}
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