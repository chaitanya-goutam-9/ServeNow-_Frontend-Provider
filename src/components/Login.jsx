import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const styles = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#CCE6FF",
      fontFamily: "Segoe UI, sans-serif",
    },
    card: {
      display: "flex",
      width: "800px",
      height: "480px",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.25)",
      backgroundColor: "#fff",
    },
    leftPanel: {
      flex: 1,
      background: "linear-gradient(to bottom right, #00c6ff, #0072ff)",
      padding: "40px 30px",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    logo: {
      fontWeight: "bold",
      fontSize: "18px",
    },
    welcomeText: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    welcomeDescription: {
      fontSize: "14px",
      lineHeight: "1.5",
      maxWidth: "90%",
      margin: "auto",
    },
    bottomText: {
      fontSize: "12px",
    },
    rightPanel: {
      flex: 1,
      backgroundColor: "#fff",
      padding: "40px 30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
    },
    subtitle: {
      fontSize: "13px",
      color: "#777",
      marginBottom: "25px",
    },
    label: {
      display: "block",
      marginBottom: "6px",
      fontWeight: "500",
      color: "#444",
    },
    inputContainer: {
      position: "relative",
      width: "100%",
      marginBottom: "18px",
    },
    input: {
      width: "100%",
      padding: "10px 40px 10px 12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
    },
    togglePassword: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      color: "#444",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    checkbox: {
      marginRight: "8px",
    },
    checkboxLabel: {
      fontSize: "13px",
      color: "#444",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    linkRow: {
      marginTop: "15px",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "13px",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
    message: {
      textAlign: "center",
      color: "green",
      marginTop: "10px",
      fontWeight: "bold",
    },
    error: {
      textAlign: "center",
      color: "red",
      marginTop: "10px",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/provider/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

 if (response.status === 200 && response.data.token) {
  localStorage.setItem("token", response.data.token);  // ✅ Save to localStorage
  setMessage("Login successful!");
  setTimeout(() => {
    navigate("/dashboard");
  }, 300);
}


    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <div>
            <div style={styles.logo}>
              {/* Optional logo */}
              {/* <img src="/logo.png" alt="ServeNow Logo" style={{ width: "100px" }} /> */}
              ServeNow
            </div>
            <div style={styles.welcomeText}>Hello ServeNow Provider</div>
            <div style={styles.welcomeDescription}>
              <b>Serve Now</b> is a smart service-broker platform connecting
              customers with skilled professionals
            </div>
          </div>
          <div style={styles.bottomText}>SERVE NOW ❤</div>
        </div>

        {/* Right Panel - Login Form */}
        <div style={styles.rightPanel}>
          <form onSubmit={handleSubmit}>
            <div style={styles.title}>Login</div>
            <div style={styles.subtitle}>
              Login to get amazing discounts and offers only for you.
            </div>

            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label style={styles.label}>Password</label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                style={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                style={styles.togglePassword}
                onClick={toggleShowPassword}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            <button type="submit" style={styles.button}>
              LOGIN
            </button>

            <div style={styles.linkRow}>
              <a href="/register" style={styles.link}>
                New User? Signup
              </a>
              <a href="/forgot-password" style={styles.link}>
                Forgot your password?
              </a>
            </div>

            {message && (
              <div
                style={
                  message.includes("successful") ? styles.message : styles.error
                }
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
