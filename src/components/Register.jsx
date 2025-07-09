import React, { useState } from 'react';
import axios from 'axios';

function Register({ onSwitch }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
  });

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
    },
    leftPane: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
    },
    rightPane: {
      flex: 1,
      background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '20px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      width: '350px',
    },
    title: {
      marginBottom: '25px',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '600',
      color: '#444',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4caf50',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    switch: {
      display: 'block',
      textAlign: 'center',
      fontSize: '13px',
      color: '#007bff',
      textDecoration: 'none',
      marginTop: '15px',
      cursor: 'pointer',
    },
    // rightTitle: {
    //   fontSize: '32px',
    //   fontWeight: 'bold',
    //   marginBottom: '20px',
    // },
    // rightText: {
      
    //   fontSize: '18px',
    //   maxWidth: '400px',
    //   lineHeight: '1.5',
      
    // },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/provider/register', formData);

      if (res.status === 200 || res.status === 201) {
        alert('Registration successful!');
        onSwitch(); // Go to login
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPane}>
        <form style={styles.card} onSubmit={handleSubmit}>
          <div style={styles.title}>REGISTER</div>

          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={styles.input}
            required
          />

          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={styles.input}
          />

          <label style={styles.label}>Phone No</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Register
          </button>
           <a href="http://localhost:5173/" style={styles.switch}>Already have an account? Login?</a>

          {/* <span style={styles.switch} onClick={onSwitch}>
            Already have an account? Login
          </span> */}
        </form>
      </div>

      {/* <div style={styles.rightPane}>
        <div style={styles.rightTitle}>Welcome!</div>
        <div style={styles.rightText}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur neque enim eius quis molestiae sed? Culpa impedit at atque ad.

        </div>
      </div> */}
    </div>
  );
}

export default Register;
