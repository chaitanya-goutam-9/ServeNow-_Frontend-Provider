import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  formContainer: {
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    padding: "30px 40px",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: "0.9",
    marginTop: "8px",
    fontWeight: "400",
  },
  formContent: {
    padding: "40px",
  },
  formGroup: {
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  formGroupFull: {
    marginBottom: "25px",
  },
  label: {
    width: "180px",
    color: "#374151",
    fontWeight: "600",
    fontSize: "0.95rem",
    letterSpacing: "0.025em",
  },
  labelFull: {
    display: "block",
    color: "#374151",
    fontWeight: "600",
    fontSize: "0.95rem",
    marginBottom: "8px",
    letterSpacing: "0.025em",
  },
  input: {
    flex: 1,
    padding: "14px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
  },
  inputFull: {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
  },
  inputFocus: {
    borderColor: "#4f46e5",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.1)",
    transform: "translateY(-2px)",
  },
  textarea: {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #e5e7eb",
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
  checkboxGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "12px",
    flex: 1,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#f8fafc",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    userSelect: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#374151",
  },
  checkboxLabelChecked: {
    backgroundColor: "#ede9fe",
    borderColor: "#8b5cf6",
    transform: "scale(1.02)",
  },
  checkbox: {
    marginRight: "8px",
    width: "18px",
    height: "18px",
    accentColor: "#8b5cf6",
  },
  fileInputContainer: {
    border: "3px dashed #d1d5db",
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
  fileInputContainerHover: {
    borderColor: "#8b5cf6",
    backgroundColor: "#f3f4f6",
    transform: "scale(1.01)",
  },
  fileInput: {
    position: "absolute",
    inset: "0",
    opacity: "0",
    cursor: "pointer",
  },
  fileInputLabel: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: "8px",
    display: "block",
  },
  fileInputText: {
    fontSize: "0.875rem",
    color: "#9ca3af",
  },
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
  submitButtonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(16, 185, 129, 0.5)",
  },
  photoPreviewContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "16px",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  photoPreview: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  photoPreviewHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  },
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
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Add CSS animation
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AddServiceForm = ({ onAdd, onUpdate }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hoveredElements, setHoveredElements] = useState({});

  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    duration: "",
    availableDays: [],
    location: "",
    contact: "",
    description: "",
    aadhaarNumber: "",
    aadhaarFile: null,
    licenseNumber: "",
    licenseFile: null,
    photos: [],
    _id: "",
  });

  // Inject CSS animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = spinKeyframes;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Fetch service if editing
  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        try {
          const res = await fetch(`${BASE_URL}/provider-services/dashboard/services/${serviceId}`, {
            credentials: "include",
          });
          if (!res.ok) throw new Error("Failed to fetch service");
          const service = await res.json();
          setFormData({
            serviceName: service.serviceName || "",
            category: service.category || "",
            price: service.price || "",
            duration: service.duration || "",
            availableDays: service.availableDays || [],
            location: service.location || "",
            contact: service.contact || "",
            description: service.description || "",
            aadhaarNumber: service.aadhaarNumber || "",
            aadhaarFile: null,
            licenseNumber: service.licenseNumber || "",
            licenseFile: null,
            photos: service.photos || [],
            _id: service._id || "",
          });
        } catch (error) {
          console.error("Failed to fetch service:", error.message);
          alert("Failed to load service data. Please try again.");
        }
      };
      fetchService();
    }
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (
      !formData.serviceName ||
      !formData.category ||
      !formData.price ||
      !formData.duration ||
      !formData.location ||
      !formData.contact ||
      !formData.aadhaarNumber ||
      !formData.licenseNumber
    ) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("serviceName", formData.serviceName);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("duration", formData.duration);
    formData.availableDays.forEach((day) => formDataToSend.append("availableDays[]", day));
    formDataToSend.append("location", formData.location);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("aadhaarNumber", formData.aadhaarNumber);
    formDataToSend.append("licenseNumber", formData.licenseNumber);

    if (formData.aadhaarFile) formDataToSend.append("aadhaarFile", formData.aadhaarFile);
    if (formData.licenseFile) formDataToSend.append("licenseFile", formData.licenseFile);
    formData.photos.forEach((photo) => formDataToSend.append("photos", photo));

    try {
      const token = localStorage.getItem("token");
      const url = serviceId
        ? `${BASE_URL}/provider-services/dashboard/services/${serviceId}`
        : `${BASE_URL}/provider-services/submit`;
      const method = serviceId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        if (serviceId) {
          onUpdate && onUpdate(result.service);
          alert("Service Updated Successfully! 🎉");
        } else {
          onAdd && onAdd(result.service);
          alert("Service Added Successfully! 🎉");
        }

        setFormData({
          serviceName: "",
          category: "",
          price: "",
          duration: "",
          availableDays: [],
          location: "",
          contact: "",
          description: "",
          aadhaarNumber: "",
          aadhaarFile: null,
          licenseNumber: "",
          licenseFile: null,
          photos: [],
          _id: "",
        });
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(`❌ Failed to ${serviceId ? "update" : "add"} service: ${errorData.msg || "Please try again."}`);
      }
    } catch (error) {
      console.error(`Error ${serviceId ? "updating" : "adding"} service:`, error);
      alert("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getInputStyle = (inputName, isFullWidth = false) => ({
    ...(isFullWidth ? styles.inputFull : styles.input),
    ...(focusedInput === inputName ? styles.inputFocus : {}),
  });

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
            {/* Form Fields */}
            {[
              ["Service Name *", "serviceName"],
              ["Category *", "category"],
              ["Price (₹) *", "price", "number"],
              ["Duration *", "duration"],
              ["Location *", "location"],
              ["Contact *", "contact", "tel"],
              ["Aadhaar Number *", "aadhaarNumber"],
              ["License Number *", "licenseNumber"],
            ].map(([label, name, type = "text"]) => (
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
                  placeholder={`Enter ${label.replace(' *', '').toLowerCase()}`}
                  required={label.includes('*')}
                />
              </div>
            ))}

            {/* Available Days */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Available Days</label>
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

            {/* File Uploads */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Upload Aadhaar</label>
              <div 
                style={{
                  ...styles.fileInputContainer,
                  ...(hoveredElements.aadhaar ? styles.fileInputContainerHover : {}),
                }}
                onMouseEnter={() => setHoveredElements(prev => ({...prev, aadhaar: true}))}
                onMouseLeave={() => setHoveredElements(prev => ({...prev, aadhaar: false}))}
              >
                <input
                  style={styles.fileInput}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, "aadhaarFile")}
                />
                <div style={styles.fileInputLabel}>📄 Upload Aadhaar Document</div>
                <div style={styles.fileInputText}>
                  {formData.aadhaarFile ? formData.aadhaarFile.name : "Click to browse files"}
                </div>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Upload License</label>
              <div 
                style={{
                  ...styles.fileInputContainer,
                  ...(hoveredElements.license ? styles.fileInputContainerHover : {}),
                }}
                onMouseEnter={() => setHoveredElements(prev => ({...prev, license: true}))}
                onMouseLeave={() => setHoveredElements(prev => ({...prev, license: false}))}
              >
                <input
                  style={styles.fileInput}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, "licenseFile")}
                />
                <div style={styles.fileInputLabel}>📋 Upload License Document</div>
                <div style={styles.fileInputText}>
                  {formData.licenseFile ? formData.licenseFile.name : "Click to browse files"}
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
                onMouseEnter={() => setHoveredElements(prev => ({...prev, photos: true}))}
                onMouseLeave={() => setHoveredElements(prev => ({...prev, photos: false}))}
              >
                <input
                  style={styles.fileInput}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                />
                <div style={styles.fileInputLabel}>📸 Upload Service Photos</div>
                <div style={styles.fileInputText}>
                  {formData.photos.length > 0 
                    ? `${formData.photos.length} file(s) selected` 
                    : "Click to browse multiple images"}
                </div>
              </div>
            </div>

            {/* Photo Preview */}
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
                    onMouseEnter={() => setHoveredElements(prev => ({...prev, [`photo-${idx}`]: true}))}
                    onMouseLeave={() => setHoveredElements(prev => ({...prev, [`photo-${idx}`]: false}))}
                  />
                ))}
              </div>
            )}

            {/* Submit Button */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
              <button
                style={{
                  ...styles.submitButton,
                  ...(hoveredElements.submitButton ? styles.submitButtonHover : {}),
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onClick={handleSubmit}
                disabled={loading}
                onMouseEnter={() => !loading && setHoveredElements(prev => ({...prev, submitButton: true}))}
                onMouseLeave={() => setHoveredElements(prev => ({...prev, submitButton: false}))}
              >
                {loading ? "Submitting..." : serviceId ? "Update Service" : "Add Service"} 
                {!loading && " ✨"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddServiceForm;