import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you can clear localStorage/token later
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.profile}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile"
          style={styles.avatar}
        />
        <h3 style={styles.username}>@YourName</h3>
      </div>

      <nav style={styles.nav}>
        <Link to="/feed" style={styles.navLink}>
          📰 Feed
        </Link>
        <button onClick={handleLogout} style={styles.logoutButton}>
          🚪 Logout
        </button>
      </nav>
    </div>
  );
}

const styles = {
  sidebar: {
    height: "100vh",
    width: "220px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "30px 20px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "fixed",
    left: 0,
    top: 0,
  },
  profile: {
    textAlign: "center",
    marginBottom: "40px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  username: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  nav: {
    width: "100%",
  },
  navLink: {
    display: "block",
    marginBottom: "20px",
    color: "#ecf0f1",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    border: "none",
    color: "#fff",
    padding: "10px",
    borderRadius: "8px",
    width: "100%",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
