import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Add Google Fonts dynamically
const addGoogleFonts = () => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@400;500;600&family=Inter:wght@400;500;600&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};
addGoogleFonts();

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      position: "relative",
      overflow: "auto",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      background: `
        linear-gradient(135deg, rgba(236,72,153,0.4), rgba(139,92,246,0.4)),
        url('/images/background1.jpg') center/cover no-repeat
      `,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.2)",
      // backdropFilter: "blur(8px)",
      zIndex: 1,
    },
    leftSide: {
      width: "60%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#fff",
      zIndex: 2,
      padding: "1rem",
    },
    logoCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      transition: "transform 0.3s ease",
    },
    brandIcon: {
      width: "150px",
      height: "150px",
      objectFit: "contain",
      marginBottom: "1rem",
      borderRadius: "50%",
      boxShadow:
        "0 10px 25px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(236, 72, 153, 0.4)",
      border: "3px solid white",
      transition: "transform 0.3s ease",
    },
    brandName: {
      fontFamily: "'Dancing Script', cursive",
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#fff",
      marginBottom: "0.5rem",
      textShadow: "2px 2px 6px rgba(0,0,0,0.4)",
    },
    brandTagline: {
      fontSize: "1rem",
      color: "#fce7f3",
      fontStyle: "italic",
      textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
    },
    rightSide: {
      width: "40%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      zIndex: 2,
      padding: "1rem",
    },
    formCard: {
      width: "100%",
      maxWidth: "250px",
      minWidth: "200px",
      background: "rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(15px)",
      borderRadius: "0.5rem",
      border: "1px solid rgba(255,255,255,0.4)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
      padding: "0.75rem",
      transition: "transform 0.2s ease",
      boxSizing: "border-box",
    },
    loginTitle: {
      fontSize: "1rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "0.5rem",
      textAlign: "center",
    },
    errorBox: {
      backgroundColor: "#fef2f2",
      borderLeft: "4px solid #ef4444",
      color: "#dc2626",
      padding: "0.75rem",
      marginBottom: "1rem",
      borderRadius: "0 0.5rem 0.5rem 0",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem",
    },
    label: {
      fontSize: "0.75rem",
      fontWeight: "500",
      fontFamily: "'Poppins', sans-serif",
      fontStyle: "normal",
      letterSpacing: "0.1px",
      marginBottom: "0.2rem",
      color: "#2d3748",
      textTransform: "uppercase",
    },
    input: {
      width: "92%",
      padding: "0.4rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.25rem",
      outline: "none",
      transition: "all 0.3s ease",
      background: "rgba(255,255,255,0.8)",
      fontFamily: "'Inter', sans-serif",
      fontSize: "0.8rem",
      color: "#1a202c",
    },
    submitBtn: {
      width: "100%",
      background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
      color: "white",
      padding: "0.5rem",
      borderRadius: "0.3rem",
      fontWeight: "600",
      fontSize: "0.8rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    registerText: {
      textAlign: "center",
      marginTop: "0.4rem",
      color: "#4a5568",
      fontFamily: "'Inter', sans-serif",
      fontSize: "0.7rem",
      fontWeight: "400",
    },
    registerLink: {
      color: "#d53f8c",
      fontWeight: "600",
      textDecoration: "none",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "0.7rem",
      letterSpacing: "0.05px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      {/* Left Side: Logo and Brand */}
      <div style={styles.leftSide}>
        <div
          style={styles.logoCard}
          onMouseEnter={(e) =>
            (e.currentTarget.firstChild.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.firstChild.style.transform = "scale(1)")
          }
        >
          <img
            src="/images/my-logo-1.png"
            alt="Homely Bakes Logo"
            style={styles.brandIcon}
          />
          <h1 style={styles.brandName}>Homely Bakes</h1>
          <p style={styles.brandTagline}>Sweet moments, delivered fresh</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div style={styles.rightSide}>
        <div style={styles.formCard}>
          <h2 style={styles.loginTitle}>Welcome Back</h2>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form style={styles.form} onSubmit={handleSubmit}>
            <div>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 8px rgba(236, 72, 153, 0.4)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>

            <div>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) =>
                  (e.target.style.boxShadow =
                    "0 0 8px rgba(236, 72, 153, 0.4)")
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #db2777, #7c3aed)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 15px rgba(236, 72, 153, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #ec4899, #8b5cf6)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={styles.registerText}>
            Don’t have an account?{" "}
            <Link to="/register" style={styles.registerLink}>
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
