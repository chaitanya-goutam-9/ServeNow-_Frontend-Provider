import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#B7E7E7",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  formContainer: {
    maxWidth: "700px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  label: {
    width: "180px",
    color: "#003366",
    fontWeight: "600",
    fontSize: "1rem",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #cce6ff",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    transition: "border 0.2s",
  },
  checkboxGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    flex: 1,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#eef7ff",
    padding: "6px 10px",
    borderRadius: "6px",
    fontSize: "0.95rem",
    fontWeight: "500",
    color: "#003366",
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "#3399ff",
    color: "white",
    border: "none",
    padding: "14px 24px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s",
  },
  photoPreviewContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "15px",
  },
  photoPreview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AddServiceForm = ({ onAdd, onUpdate }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    duration: "",
    availableDays: [],
    location: "",
    contact: "",
    aadhaarNumber: "",
    aadhaarFile: null,
    licenseNumber: "",
    licenseFile: null,
    photos: [],
    _id: "",
  });

  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        try {
          const res = await fetch(`${BASE_URL}/provider-services/dashboard/services/${serviceId}`, {
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error("Failed to fetch service");
          }
          const service = await res.json();
          setFormData({
            serviceName: service.serviceName || "",
            category: service.category || "",
            price: service.price || "",
            duration: service.duration || "",
            availableDays: service.availableDays || [],
            location: service.location || "",
            contact: service.contact || "",
            aadhaarNumber: service.aadhaarNumber || "",
            aadhaarFile: null, // Files can't be pre-populated
            licenseNumber: service.licenseNumber || "",
            licenseFile: null, // Files can't be pre-populated
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
    const formDataToSend = new FormData();
    formDataToSend.append("serviceName", formData.serviceName);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("duration", formData.duration);
    formData.availableDays.forEach((day) => formDataToSend.append("availableDays[]", day));
    formDataToSend.append("location", formData.location);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("aadhaarNumber", formData.aadhaarNumber);
    formDataToSend.append("licenseNumber", formData.licenseNumber);

    if (formData.aadhaarFile) {
      formDataToSend.append("aadhaarFile", formData.aadhaarFile);
    }
    if (formData.licenseFile) {
      formDataToSend.append("licenseFile", formData.licenseFile);
    }
    formData.photos.forEach((photo) => {
      formDataToSend.append("photos", photo);
    });

    try {
      const token = localStorage.getItem("token");
      const url = serviceId
        ? `${BASE_URL}/provider-services/dashboard/services/${serviceId}`
        : `${BASE_URL}/provider-services/submit`;
      const method = serviceId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        if (serviceId) {
          onUpdate(result.service); // Call onUpdate for edit
          alert("Service Updated Successfully!");
        } else {
          onAdd(result.service); // Call onAdd for new service
          alert("Service Added Successfully!");
        }
        setFormData({
          serviceName: "",
          category: "",
          price: "",
          duration: "",
          availableDays: [],
          location: "",
          contact: "",
          aadhaarNumber: "",
          aadhaarFile: null,
          licenseNumber: "",
          licenseFile: null,
          photos: [],
          _id: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to ${serviceId ? "update" : "add"} service: ${errorData.msg || "Please try again."}`);
      }
    } catch (error) {
      console.error(`Error ${serviceId ? "updating" : "adding"} service:`, error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formContainer}>
        <h2 style={{ color: "#003366", marginBottom: "20px" }}>
          {serviceId ? "Edit Service" : "Add New Service"}
        </h2>

        {[
          ["Service Name", "serviceName"],
          ["Category", "category"],
          ["Price (₹)", "price", "number"],
          ["Duration", "duration"],
          ["Location", "location"],
          ["Contact", "contact", "tel"],
          ["Aadhaar Number", "aadhaarNumber"],
          ["License Number", "licenseNumber"],
        ].map(([label, name, type = "text"]) => (
          <div key={name} style={styles.formGroup}>
            <label style={styles.label}>{label}</label>
            <input
              style={styles.input}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div style={styles.formGroup}>
          <label style={styles.label}>Available Days</label>
          <div style={styles.checkboxGroup}>
            {daysOfWeek.map((day) => (
              <label key={day} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.availableDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Aadhaar</label>
          <input
            style={styles.input}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileChange(e, "aadhaarFile")}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload License</label>
          <input
            style={styles.input}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileChange(e, "licenseFile")}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload Photos</label>
          <input
            style={styles.input}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
          />
        </div>

        {formData.photos.length > 0 && (
          <div style={styles.photoPreviewContainer}>
            {formData.photos.map((file, idx) => (
              <img
                key={idx}
                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                alt={`Preview ${idx}`}
                style={styles.photoPreview}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            ))}
          </div>
        )}

        <button
          style={styles.submitButton}
          onClick={handleSubmit}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1c80e3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#3399ff")
          }
        >
          {serviceId ? "Update Service" : "Add Service"}
        </button>
      </div>
    </div>
  );
};

export default AddServiceForm;