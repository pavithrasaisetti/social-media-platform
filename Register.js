import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [fadeIn, setFadeIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration submitted!");
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div
      style={{
        ...styles.page,
        background: darkMode
          ? "linear-gradient(to right, #2c3e50, #0c6471ff)"
          : "linear-gradient(to right, #f9d423, #ff4e50)",
      }}
    >
      <div
        style={{
          ...styles.card,
          background: darkMode ? "#1e1e1e" : "#fff",
          color: darkMode ? "#eee" : "#333",
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease-in-out",
        }}
      >
        {/* Toggle */}
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              ...styles.toggleButton,
              backgroundColor: darkMode ? "#444" : "#eee",
              color: darkMode ? "#fff" : "#333",
            }}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Logo */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="App Logo"
          style={{
            width: "60px",
            height: "60px",
            marginBottom: "15px",
            borderRadius: "50%",
          }}
        />

        <h2 style={styles.title}>💞 Join Our Heartspace</h2>
        <p style={{ ...styles.subtitle, color: darkMode ? "#ccc" : "#666" }}>
          Because sweet souls like you belong here 💕
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#2b2b2b" : "#fff",
              color: darkMode ? "#eee" : "#000",
              border: darkMode ? "1px solid #555" : "1px solid #ccc",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#2b2b2b" : "#fff",
              color: darkMode ? "#eee" : "#000",
              border: darkMode ? "1px solid #555" : "1px solid #ccc",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              backgroundColor: darkMode ? "#2b2b2b" : "#fff",
              color: darkMode ? "#eee" : "#000",
              border: darkMode ? "1px solid #555" : "1px solid #ccc",
            }}
          />
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={{ ...styles.footerText, color: darkMode ? "#ccc" : "#555" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              ...styles.link,
              color: darkMode ? "#4ca1af" : "#ff4e50",
            }}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
    fontSize: "24px",
    fontWeight: "600",
  },
  subtitle: {
    marginBottom: "20px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff4e50",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "10px",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "13px",
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
  },
  toggleButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
  },
};
