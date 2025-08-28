
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocus, setInputFocus] = useState({
  email: false,
  password: false,
});
const [hover, setHover] = useState(false);




  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      alert("Login successful!");
      navigate("/feed");
    } else {
      setError("Please enter both email and password.");
    }
  };
  const togglePassword = () => setShowPassword(!showPassword);


  return (
    <div
      style={{
        ...styles.page,
        background: darkMode
          ? "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
          : "linear-gradient(to right, #ff6ec4, #7873f5)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          ...styles.card,
          background: darkMode ? "#1e1e1e" : "#ffffffcc",
          color: darkMode ? "#eee" : "#333",
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              ...styles.toggleButton,
              backgroundColor: darkMode ? "#333" : "#f0f0f0",
              color: darkMode ? "#fff" : "#333",
            }}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Logo & Title */}
        <div style={styles.logoSection}>
          <i className="fa-solid fa-heart-circle-bolt" style={styles.logoIcon}></i>
          <h1 style={styles.logoText}>TiedHearts</h1>
        </div>

        <h2 style={styles.title}>You're back! 💖</h2>
        <p style={{ ...styles.subtitle, color: darkMode ? "#ccc" : "#666" }}>
          Let’s vibe again 🎧
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputEmoji}>📧</span>
            <input
  type="email"
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
  onFocus={() => setInputFocus({ ...inputFocus, email: true })}
  onBlur={() => setInputFocus({ ...inputFocus, email: false })}
  required
  style={{
    ...styles.input,
    backgroundColor: darkMode ? "#2b2b2b" : "#fff",
    color: darkMode ? "#eee" : "#000",
    boxShadow: inputFocus.email ? "0 0 8px rgba(255, 105, 180, 0.5)" : "none",
    border: inputFocus.email ? "1px solid #ff69b4" : "1px solid #ddd",
  }}
/>

          </div>
          <div style={styles.inputWrapper}>
  <span style={styles.inputEmoji}>🔒</span>

  <input
  type={showPassword ? "text" : "password"}
  name="password"
  placeholder="Password"
  value={formData.password}
  onChange={handleChange}
  onFocus={() => setInputFocus({ ...inputFocus, password: true })}
  onBlur={() => setInputFocus({ ...inputFocus, password: false })}
  required
  style={{
    ...styles.input,
    backgroundColor: darkMode ? "#2b2b2b" : "#fff",
    color: darkMode ? "#eee" : "#000",
    boxShadow: inputFocus.password ? "0 0 8px rgba(255, 105, 180, 0.5)" : "none",
    border: inputFocus.password ? "1px solid #ff69b4" : "1px solid #ddd",
  }}
/>


  <span
    onClick={togglePassword}
    style={{
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-77%)",
      cursor: "pointer",
      fontSize: "18px",
    }}
  >
    {showPassword ? "🙊" : "🙈"}
  </span>
</div>

          <button
  type="submit"
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  style={{
    ...styles.button,
    backgroundColor: hover ? "#45a049" : "#4CAF50",
    transform: hover ? "scale(1.02)" : "scale(1)",
  }}
>
  🌀 Login
</button>

        </form>

        <p style={{ ...styles.footerText, color: darkMode ? "#ccc" : "#555" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Signup here
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
  },
  card: {
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  logoSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  logoIcon: {
    fontSize: "32px",
    color: "#e91e63",
  },
  logoText: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#e91e63",
    fontFamily: "'Poppins', cursive",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "15px",
  },
  inputIcon: {
    position: "absolute",
    top: "50%",
    left: "12px",
    transform: "translateY(-50%)",
    color: "#aaa",
    fontSize: "14px",
  },
  
  input: {
  width: "100%",
  maxWidth: "100%",
  padding: "12px 16px 12px 40px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  marginBottom: "15px",
  transition: "0.2s ease",
},

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "13px",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "13px",
  },
  link: {
    color: "#ff9800",
    fontWeight: "bold",
    textDecoration: "none",
  },
  toggleButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "10px",


  },
  inputEmoji: {
  position: "absolute",
  top: "50%",
  left: "12px",
  transform: "translateY(-79%)",
  fontSize: "16px",
  pointerEvents: "none",
},

};



