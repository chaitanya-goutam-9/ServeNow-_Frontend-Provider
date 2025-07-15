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
} from "lucide-react";
import ManageBookings from "../pages/ManageBookings";
import ServiceHistory from "../pages/ServiceHistory";
import Messages from "../pages/Messages";
import EarningsReport from "../pages/EarningsReport";
import Support from "../pages/Support";
import AddServiceForm from "../components/AddServiceForm";

const styles = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    width: "100vw",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f8ff",
    boxSizing: "border-box",
    margin: 0,
    position: "absolute",
    top: 0,
    left: 0,
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#e6f2ff",
    color: "#003366",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
  },
  sidebarTop: {
    flexGrow: 1,
  },
  sidebarTitle: {
    fontSize: "1.2rem",
    marginBottom: "16px",
    borderBottom: "1px solid #99ccff",
    paddingBottom: "8px",
  },
  serviceList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  serviceItem: {
    marginBottom: "10px",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "4px",
    transition: "background 0.3s",
    textDecoration: "none",
    color: "#003366",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1rem",
  },
  logoutButton: {
    padding: "10px",
    backgroundColor: "#3399ff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
  },
  mainContent: {
    marginLeft: "250px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflowY: "auto",
  },
  header: {
    backgroundColor: "#3399ff",
    color: "white",
    padding: "20px",
    fontSize: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
  },
  addButton: {
    padding: "10px 15px",
    backgroundColor: "#0066cc",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "none",
  },
  contentArea: {
    padding: "20px",
    // backgroundColor: "#f0f8ff",
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
    padding: "20px",
    backgroundColor: "#f0f8ff",
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
  },
  card: {
    background: "white",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 0 8px rgba(0, 51, 102, 0.1)",
  },
  cardActions: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  actionButton: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "4px",
    fontSize: "12px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#00cc99",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#ff6666",
    color: "white",
  },
};

const providerServices = [
  { name: "Dashboard Home", component: null, icon: <Home size={18} /> },
  { name: "Add New Service", component: AddServiceForm, icon: <Plus size={18} /> },
  { name: "Manage Bookings", component: ManageBookings, icon: <Calendar size={18} /> },
  { name: "Service History", component: ServiceHistory, icon: <History size={18} /> },
  { name: "Messages", component: Messages, icon: <MessageSquare size={18} /> },
  { name: "Earnings Report", component: EarningsReport, icon: <DollarSign size={18} /> },
  { name: "Support", component: Support, icon: <HelpCircle size={18} /> },
];

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem("services")) || [];
    setCards(savedServices);
  }, []);

  const handleLogout = () => {
    alert("Logging out...");
  };

  const handleDelete = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
    localStorage.setItem("services", JSON.stringify(updatedCards));
  };

  const handleEdit = (index) => {
    navigate(`/add-service/${index}`);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleAddService = (newService) => {
    const updatedCards = [...cards, newService];
    setCards(updatedCards);
    localStorage.setItem("services", JSON.stringify(updatedCards));
    setSelectedService(null);
  };

  const renderContent = () => {
    if (!selectedService || selectedService.component === null) {
      return (
        <section style={styles.cards}>
          {cards.map((card, index) => (
            <div key={index} style={styles.card}>
              <h3>{card.serviceName || card.title || card.category}</h3>
              <p>{card.description}</p>
              {card.price && (
                <p>
                  <strong>Price:</strong> ₹{card.price} <br />
                  <strong>Category:</strong> {card.category}
                </p>
              )}
              {card.availableDays?.length > 0 && (
                <p>
                  <strong>Available:</strong> {card.availableDays.join(", ")}
                </p>
              )}
              {card.location && (
                <p>
                  <strong>Location:</strong> {card.location}
                </p>
              )}
              <div style={styles.cardActions}>
                <button
                  style={{ ...styles.actionButton, ...styles.editButton }}
                  onClick={() => handleEdit(index)}
                >
                  ✏️ Edit
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onClick={() => handleDelete(index)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      );
    }

    const SelectedComponent = selectedService.component;
    return (
      <section style={styles.contentArea}>
        {SelectedComponent === AddServiceForm ? (
          <SelectedComponent onSubmit={handleAddService} />
        ) : (
          <SelectedComponent />
        )}
      </section>
    );
  };

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
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d6ebff")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {service.icon}
                <span>{service.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <button style={styles.logoutButton} onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.header}>
          <span>
            <strong>Provider</strong> Dashboard
          </span>
          <Link to="/add-service" style={styles.addButton}>
            ➕ Add New Service
          </Link>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
