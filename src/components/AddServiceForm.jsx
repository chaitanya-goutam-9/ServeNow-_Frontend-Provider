import React, { useState } from "react";

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

const AddServiceForm = () => {
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
  });

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

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("serviceName", formData.serviceName);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("availableDays", JSON.stringify(formData.availableDays));
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
      const response = await fetch("http://localhost:5000/api/provider-services/submit", {
        method: "POST",
        credentials: "include", // Send cookies with the request
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Service Added Successfully!");
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
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to add service: ${errorData.msg || "Please try again."}`);
      }
    } catch (error) {
      alert("Server error. Try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formContainer}>
        <h2 style={{ color: "#003366", marginBottom: "20px" }}>
          Add New Service
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
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Upload License</label>
          <input
            style={styles.input}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => handleFileChange(e, "licenseFile")}
            required
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
                src={URL.createObjectURL(file)}
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
          Add Service
        </button>
      </div>
    </div>
  );
};

export default AddServiceForm;