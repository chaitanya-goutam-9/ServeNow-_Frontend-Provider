
// Import necessary React hooks for state management and side effects
import React, { useEffect, useState } from "react";
// Import hooks from react-router-dom for URL parameters and navigation
import { useParams, useNavigate } from "react-router-dom";

// Define the base URL for API requests
const BASE_URL = "http://localhost:5000/api";

// Define styles object for component styling
const styles = {
  // Wrapper for the entire page, ensuring full viewport height and padding
  pageWrapper: {
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  // Container for the form, centered with a max width, white background, and shadow
  formContainer: {
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
  },
  // Header section with a gradient background and centered text
  header: {
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    padding: "30px 40px",
    textAlign: "center",
  },
  // Title style for the form header
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  // Subtitle style for additional header text
  subtitle: {
    fontSize: "1.1rem",
    opacity: "0.9",
    marginTop: "8px",
    fontWeight: "400",
  },
  // Container for the form content with padding
  formContent: {
    padding: "40px",
  },
  // Styling for form groups containing labels and inputs
  formGroup: {
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  // Styling for full-width form groups (e.g., textarea)
  formGroupFull: {
    marginBottom: "25px",
  },
  // Label style for form inputs
  label: {
    width: "180px",
    color: "#374151",
    fontWeight: "600",
    fontSize: "0.95rem",
    letterSpacing: "0.025em",
  },
  // Label style for full-width inputs
  labelFull: {
    display: "block",
    color: "#374151",
    fontWeight: "600",
    fontSize: "0.95rem",
    marginBottom: "8px",
    letterSpacing: "0.025em",
  },
  // Input style for regular inputs
  input: {
    flex: 1,
    padding: "14px 16px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
  },
  // Input style for full-width inputs
  inputFull: {
    width: "100%",
    padding: "14px 16px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
  },
  // Style for focused inputs
  inputFocus: {
    borderColor: "#4f46e5",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
    transform: "translateY(-2px)",
  },
  // Style for textarea
  textarea: {
    width: "100%",
    padding: "14px 16px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderRadius: "12px",
    fontSize: "1rem",
    resize: "vertical",
    minHeight: "100px",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  // Container for checkbox group
  checkboxGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "12px",
    flex: 1,
  },
  // Style for checkbox labels
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#f8fafc",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#e2e8f0",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    userSelect: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#374151",
  },
  // Style for checked checkbox labels
  checkboxLabelChecked: {
    backgroundColor: "#ede9fe",
    borderColor: "#8b5cf6",
    transform: "scale(1.02)",
  },
  // Style for checkboxes
  checkbox: {
    marginRight: "8px",
    width: "18px",
    height: "18px",
    accentColor: "#8b5cf6",
  },
  // Container for file inputs
  fileInputContainer: {
    borderWidth: "3px",
    borderStyle: "dashed",
    borderColor: "#d1d5db",
    borderRadius: "12px",
    padding: "24px",
    textAlign: "center",
    transition: "all 0.3s ease",
    backgroundColor: "#f9fafb",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    flex: 1,
  },
  // Hover style for file input container
  fileInputContainerHover: {
    borderColor: "#8b5cf6",
    backgroundColor: "#f3f4f6",
    transform: "scale(1.01)",
  },
  // Style for file input elements
  fileInput: {
    position: "absolute",
    inset: "0",
    opacity: "0",
    cursor: "pointer",
  },
  // Label style for file inputs
  fileInputLabel: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: "8px",
    display: "block",
  },
  // Text style for file input placeholders
  fileInputText: {
    fontSize: "0.875rem",
    color: "#9ca3af",
  },
  // Style for the location button
  locationButton: {
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "0.9rem",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
  },
  // Hover style for the location button
  locationButtonHover: {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
  },
  // Style for the submit button
  submitButton: {
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    border: "none",
    padding: "16px 32px",
    fontSize: "1.1rem",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "20px",
    minWidth: "140px",
    boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)",
  },
  // Hover style for the submit button
  submitButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(16, 185, 129, 0.5)",
  },
  // Container for photo previews
  photoPreviewContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "16px",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f8fafc",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#e2e8f0",
    borderRadius: "12px",
  },
  // Style for individual photo previews
  photoPreview: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  // Hover style for photo previews
  photoPreviewHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  },
  // Overlay for loading state
  loadingOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1000",
  },
  // Spinner style for loading animation
  spinner: {
    width: "50px",
    height: "50px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "#f3f3f3",
    borderTopWidth: "5px",
    borderTopStyle: "solid",
    borderTopColor: "#4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  // Style for error messages
  errorMessage: {
    color: "#ef4444",
    fontSize: "0.9rem",
    marginBottom: "16px",
    textAlign: "center",
  },
};

// Define CSS animation for spinner
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Array of days for availability selection
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Predefined categories for dropdown, with values matching backend expectations
const categories = [
  { value: "plumber", label: "Plumber" },
  { value: "electrician", label: "electrician" },
  { value: "cleaning", label: "Cleaning" },
  { value: "painting", label: "Painting" },
  { value: "carpentry", label: "Carpentry" },
  { value: "gardening", label: "Gardening" },
  { value: "pest-control", label: "Pest Control" },
  { value: "ac-repair", label: "AC Repair" },
  { value: "beauty-services", label: "Beauty Services" },
  { value: "fitness-training", label: "Fitness Training" },
];

// Define the AddServiceForm component
const AddServiceForm = ({ onAdd, onUpdate }) => {
  // Get serviceId from URL parameters for editing existing services
  const { serviceId } = useParams();
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState("");
  // State for tracking focused input field
  const [focusedInput, setFocusedInput] = useState(null);
  // State for tracking hovered elements
  const [hoveredElements, setHoveredElements] = useState({});

  // State for form data, initialized with empty/default values
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "", // Using serviceType to match backend
    price: "",
    duration: "",
    availableDays: [],
    location: "",
    contact: "",
    description: "",
    aadhaarNumber: "",
    aadhaar: null,
    licenseNumber: "",
    license: null,
    photos: [],
    geoLocation: { type: "Point", coordinates: [0, 0] },
    _id: "",
  });

  // Effect to inject CSS animation for spinner into the document head
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = spinKeyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style); // Cleanup on unmount
  }, []);

  // Effect to log formData changes for debugging
  useEffect(() => {
    console.log("Current formData state:", JSON.stringify(formData, null, 2));
  }, [formData]);

  // Function to validate MongoDB ObjectId format
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  // Effect to fetch service data if editing an existing service
  useEffect(() => {
    if (serviceId) {
      if (!isValidObjectId(serviceId)) {
        console.error("Invalid serviceId format:", serviceId);
        setError("Invalid service ID. Please check the URL and try again.");
        return;
      }

      const fetchService = async () => {
        setLoading(true);
        setError("");
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setError("Authentication token is missing. Please log in again.");
            navigate("/login");
            return;
          }

          console.log("Fetching service with ID:", serviceId);
          const res = await fetch(`${BASE_URL}/provider/dashboard/services/${serviceId}?t=${Date.now()}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            if (res.status === 401) {
              setError("Unauthorized: Invalid or expired token. Please log in again.");
              localStorage.removeItem("token");
              navigate("/login");
            } else if (res.status === 404) {
              setError("Service not found or you are not authorized to view it.");
            } else {
              setError(`Failed to fetch service: ${errorData.msg || "Unknown error"}`);
            }
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const response = await res.json();
          console.log("Full API response:", JSON.stringify(response, null, 2));
          const service = response.service; // Access nested service object
          if (!service || !service._id) {
            setError("Invalid service data received from the server.");
            setLoading(false);
            return;
          }

          setFormData({
            serviceName: service.serviceName || "",
            serviceType: service.serviceType || "", // Using serviceType to match backend
            price: service.price ? service.price.toString() : "",
            duration: service.duration || "",
            availableDays: Array.isArray(service.availableDays) ? service.availableDays : [],
            location: service.location || "",
            contact: service.contact || "",
            description: service.description || "",
            aadhaarNumber: service.aadhaarNumber || "",
            aadhaar: null, // File inputs are not pre-filled
            licenseNumber: service.licenseNumber || "",
            license: null, // File inputs are not pre-filled
            photos: Array.isArray(service.photos) ? service.photos : [],
            geoLocation: service.geoLocation || { type: "Point", coordinates: [0, 0] },
            _id: service._id || "",
          });
        } catch (error) {
          console.error("Failed to fetch service:", error.message);
          setError(`Failed to load service data: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [serviceId, navigate]);

  // Function to get current location using the geolocation API
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        { headers: { "User-Agent": "ServiceApp/1.0" } }
      );
      if (!response.ok) throw new Error("Failed to fetch address");

      const data = await response.json();
      const address = data.address;
      const formattedAddress = `${address.city || address.town || address.village || "Unknown"}, ${address.state || "Unknown"}, ${address.country || "Unknown"}`;

      setFormData((prev) => ({
        ...prev,
        location: formattedAddress,
        geoLocation: { type: "Point", coordinates: [longitude, latitude] },
      }));
    } catch (error) {
      console.error("Geolocation error:", error.message);
      setError("Failed to get location. Please enter manually or try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // Handler for toggling available days
  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
    setError("");
  };

  // Handler for file changes (aadhaar or license)
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: file }));
    setError("");
  };

  // Handler for multiple photo uploads
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
    setError("");
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (
      !formData.serviceName ||
      !formData.serviceType || // Using serviceType
      !formData.price ||
      !formData.duration ||
      !formData.location ||
      !formData.contact ||
      !formData.aadhaarNumber ||
      !formData.licenseNumber ||
      (!formData.aadhaar && !serviceId) ||
      (!formData.license && !serviceId) ||
      (!formData.photos.length && !serviceId) ||
      formData.geoLocation.coordinates[0] === 0 ||
      formData.geoLocation.coordinates[1] === 0
    ) {
      setError("Please fill in all required fields, including location (use 'Get Current Location'), Aadhaar, license, and photos.");
      setLoading(false);
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError("Price must be a valid positive number.");
      setLoading(false);
      return;
    }

    if (!formData.availableDays.length) {
      setError("Please select at least one available day.");
      setLoading(false);
      return;
    }

    const [longitude, latitude] = formData.geoLocation.coordinates;
    if (
      isNaN(longitude) ||
      isNaN(latitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      setError("Invalid location coordinates. Please fetch location again.");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("serviceName", formData.serviceName);
    formDataToSend.append("serviceType", formData.serviceType); // Using serviceType
    formDataToSend.append("price", price);
    formDataToSend.append("duration", formData.duration);
    formData.availableDays.forEach((day) => formDataToSend.append("availableDays[]", day));
    formDataToSend.append("location", formData.location);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("aadhaarNumber", formData.aadhaarNumber);
    formDataToSend.append("licenseNumber", formData.licenseNumber);
    formDataToSend.append("geoLocation", JSON.stringify(formData.geoLocation));
    if (formData.aadhaar) formDataToSend.append("aadhaar", formData.aadhaar); // Matches backend expectation
    if (formData.license) formDataToSend.append("license", formData.license); // Matches backend expectation
    formData.photos.forEach((photo) => {
      if (photo instanceof File) formDataToSend.append("photos", photo); // Matches backend expectation
    });

    // Log FormData entries for debugging
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing. Please log in again.");
        navigate("/login");
        setLoading(false);
        return;
      }

      const url = serviceId
        ? `${BASE_URL}/provider/dashboard/services/${serviceId}`
        : `${BASE_URL}/provider/submit`;
      const method = serviceId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const responseData = await response.json();
      console.log("Server Response:", responseData);

      if (response.ok) {
        if (serviceId) {
          onUpdate && onUpdate(responseData.service);
          alert("Service Updated Successfully! 🎉");
        } else {
          onAdd && onAdd(responseData.service);
          alert("Service Added Successfully! 🎉");
        }
        setFormData({
          serviceName: "",
          serviceType: "", // Using serviceType
          price: "",
          duration: "",
          availableDays: [],
          location: "",
          contact: "",
          description: "",
          aadhaarNumber: "",
          aadhaar: null,
          licenseNumber: "",
          license: null,
          photos: [],
          geoLocation: { type: "Point", coordinates: [0, 0] },
          _id: "",
        });
        navigate("/dashboard");
      } else {
        setError(`Failed to ${serviceId ? "update" : "add"} service: ${responseData.msg || "Please try again."}`);
      }
    } catch (error) {
      console.error(`Error ${serviceId ? "updating" : "adding"} service:`, error);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to get input styles, applying full-width or focused styles as needed
  const getInputStyle = (inputName, isFullWidth = false) => ({
    ...(isFullWidth ? styles.inputFull : styles.input),
    ...(focusedInput === inputName ? styles.inputFocus : {}),
  });

  // Show loading spinner while fetching data for edit mode
  if (loading && serviceId) {
    return (
      <div style={styles.loadingOverlay}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  // Render the form
  return (
    <>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
        </div>
      )}
      <div style={styles.pageWrapper}>
        <div style={styles.formContainer}>
          <div style={styles.header}>
            <h1 style={styles.title}>
              {serviceId ? "Edit Service" : "Add New Service"}
            </h1>
            <p style={styles.subtitle}>
              {serviceId ? "Update your service details" : "Fill in the details to create your service listing"}
            </p>
          </div>

          <div style={styles.formContent}>
            {error && <p style={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit}>
              {[
                ["Service Name *", "serviceName"],
                ["serviceType *", "serviceType"], // Using serviceType
                ["Price (₹) *", "price", "number"],
                ["Duration *", "duration"],
                ["Contact *", "contact", "tel"],
                ["Aadhaar Number *", "aadhaarNumber"],
                ["License Number *", "licenseNumber"],
              ].map(([label, name, type = "text"]) => {
                if (name === "serviceType") {
                  return (
                    <div key={name} style={styles.formGroup}>
                      <label style={styles.label}>{label}</label>
                      <select
                        style={getInputStyle(name)}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedInput(name)}
                        onBlur={() => setFocusedInput(null)}
                        required={label.includes("*")}
                      >
                        <option value="">Select serviceType</option>
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else {
                  return (
                    <div key={name} style={styles.formGroup}>
                      <label style={styles.label}>{label}</label>
                      <input
                        style={getInputStyle(name)}
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        onFocus={() => setFocusedInput(name)}
                        onBlur={() => setFocusedInput(null)}
                        placeholder={`Enter ${label.replace(" *", "").toLowerCase()}`}
                        required={label.includes("*")}
                      />
                    </div>
                  );
                }
              })}

              <div style={styles.formGroup}>
                <label style={styles.label}>Location *</label>
                <div style={{ flex: 1, display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    style={getInputStyle("location")}
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    onFocus={() => setFocusedInput("location")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Enter location or fetch current location"
                    required
                  />
                  <button
                    type="button"
                    style={{
                      ...styles.locationButton,
                      ...(hoveredElements.locationButton ? styles.locationButtonHover : {}),
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    onClick={getCurrentLocation}
                    disabled={loading}
                    onMouseEnter={() => !loading && setHoveredElements((prev) => ({ ...prev, locationButton: true }))}
                    onMouseLeave={() => setHoveredElements((prev) => ({ ...prev, locationButton: false }))}
                  >
                    {loading ? "Fetching..." : "Get Current Location 📍"}
                  </button>
                </div>
              </div>

              <div style={styles.formGroupFull}>
                <label style={styles.labelFull}>Description</label>
                <textarea
                  style={getInputStyle("description", true)}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onFocus={() => setFocusedInput("description")}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Enter service description (optional)"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Available Days *</label>
                <div style={styles.checkboxGroup}>
                  {daysOfWeek.map((day) => (
                    <label
                      key={day}
                      style={{
                        ...styles.checkboxLabel,
                        ...(formData.availableDays.includes(day) ? styles.checkboxLabelChecked : {}),
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.availableDays.includes(day)}
                        onChange={() => handleDayToggle(day)}
                        style={styles.checkbox}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Upload Aadhaar *</label>
                <div
                  style={{
                    ...styles.fileInputContainer,
                    ...(hoveredElements.aadhaar ? styles.fileInputContainerHover : {}),
                  }}
                  onMouseEnter={() => setHoveredElements((prev) => ({ ...prev, aadhaar: true }))}
                  onMouseLeave={() => setHoveredElements((prev) => ({ ...prev, aadhaar: false }))}
                >
                  <input
                    style={styles.fileInput}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange(e, "aadhaar")}
                    required={!serviceId}
                  />
                  <div style={styles.fileInputLabel}>📄 Upload Aadhaar Document</div>
                  <div style={styles.fileInputText}>
                    {formData.aadhaar ? formData.aadhaar.name : serviceId ? "Previously uploaded" : "Click to browse files"}
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Upload License *</label>
                <div
                  style={{
                    ...styles.fileInputContainer,
                    ...(hoveredElements.license ? styles.fileInputContainerHover : {}),
                  }}
                  onMouseEnter={() => setHoveredElements((prev) => ({ ...prev, license: true }))}
                  onMouseLeave={() => setHoveredElements((prev) => ({ ...prev, license: false }))}
                >
                  <input
                    style={styles.fileInput}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileChange(e, "license")}
                    required={!serviceId}
                  />
                  <div style={styles.fileInputLabel}>📋 Upload License Document</div>
                  <div style={styles.fileInputText}>
                    {formData.license ? formData.license.name : serviceId ? "Previously uploaded" : "Click to browse files"}
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Upload Photos *</label>
                <div
                  style={{
                    ...styles.fileInputContainer,
                    ...(hoveredElements.photos ? styles.fileInputContainerHover : {}),
                  }}
                  onMouseEnter={() => setHoveredElements((prev) => ({ ...prev, photos: true }))}
                  onMouseLeave={() => setHoveredElements((prev) => ({ ...prev, photos: false }))}
                >
                  <input
                    style={styles.fileInput}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    required={!serviceId}
                  />
                  <div style={styles.fileInputLabel}>📸 Upload Service Photos</div>
                  <div style={styles.fileInputText}>
                    {formData.photos.length > 0
                      ? `${formData.photos.length} file(s) selected`
                      : serviceId
                      ? "Previously uploaded"
                      : "Click to browse multiple images"}
                  </div>
                </div>
              </div>

              {formData.photos.length > 0 && (
                <div style={styles.photoPreviewContainer}>
                  {formData.photos.map((file, idx) => (
                    <img
                      key={idx}
                      src={typeof file === "string" ? file : URL.createObjectURL(file)}
                      alt={`Preview ${idx + 1}`}
                      style={{
                        ...styles.photoPreview,
                        ...(hoveredElements[`photo-${idx}`] ? styles.photoPreviewHover : {}),
                      }}
                      onMouseEnter={() => setHoveredElements((prev) => ({ ...prev, [`photo-${idx}`]: true }))}
                      onMouseLeave={() => setHoveredElements((prev) => ({ ...prev, [`photo-${idx}`]: false }))}
                    />
                  ))}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", marginTop: "30px" }}>
                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    ...(hoveredElements.submitButton ? styles.submitButtonHover : {}),
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  disabled={loading}
                  onMouseEnter={() => !loading && setHoveredElements((prev) => ({ ...prev, submitButton: true }))}
                  onMouseLeave={() => setHoveredElements((prev) => ({ ...prev, submitButton: false }))}
                >
                  {loading ? "Submitting..." : serviceId ? "Update Service" : "Add Service"} {!loading && " ✨"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// Export the component
export default AddServiceForm;