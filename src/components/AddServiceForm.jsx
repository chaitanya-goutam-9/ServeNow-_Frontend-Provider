import React, { useState } from "react";

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#B7E7E7",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
  },
  formContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 102, 204, 0.1)",
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  label: {
    width: "150px",
    color: "#003366",
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #cce6ff",
    borderRadius: "6px",
    fontSize: "1rem",
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
    gap: "5px",
    color: "#003366",
  },
  imagePreview: {
    width: "100%",
    maxHeight: "200px",
    objectFit: "contain",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #cce6ff",
  },
  submitButton: {
    backgroundColor: "#3399ff",
    color: "white",
    border: "none",
    padding: "12px 20px",
    fontSize: "1rem",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
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
    image: "",
  });

  // const [imagePreview, setImagePreview] = useState(null);

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

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: reader.result,
  //     }));
  //     setImagePreview(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Service Added Successfully!");
    const saved = JSON.parse(localStorage.getItem("services")) || [];
    localStorage.setItem("services", JSON.stringify([...saved, formData]));
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formContainer}>
        <h2 style={{ color: "#003366", marginBottom: "20px" }}>Add New Service</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Service Name</label>
            <input
              style={styles.input}
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              placeholder="Enter Name"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category</label>
            <input
              style={styles.input}
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Cleaning, Plumbing"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Price (₹)</label>
            <input
              style={styles.input}
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter rupees"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Duration</label>
            <input
              style={styles.input}
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 2 hours"
              required
            />
          </div>

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
            <label style={styles.label}>Location</label>
            <input
              style={styles.input}
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Location"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contact</label>
            <input
              style={styles.input}
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter Number"
              required
            />
          </div>

          {/* <div style={styles.formGroup}>
            <label style={styles.label}>Service Image</label>
            <div style={{ flex: 1 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ ...styles.input, padding: "8px" }}
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
              )}
            </div>
          </div> */}

          <button type="submit" style={styles.submitButton}>
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;
