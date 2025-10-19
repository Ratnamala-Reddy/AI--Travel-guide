import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setError("User already exists! Please login.");
      setLoading(false);
      navigate("/login");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    
    setLoading(false);
    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background circles */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
        top: "-50px",
        left: "-50px"
      }}></div>
      <div style={{
        position: "absolute",
        width: "200px",
        height: "200px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
        bottom: "-30px",
        right: "-30px"
      }}></div>

      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "40px 35px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        position: "relative",
        zIndex: 1,
        animation: "slideIn 0.5s ease-out"
      }}>
        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        <h2 style={{
          textAlign: "center",
          marginBottom: "10px",
          color: "#333",
          fontWeight: "700"
        }}>
          Create Account
        </h2>
        <p style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#666",
          fontSize: "14px"
        }}>
          Sign up to start your adventure with Go Globe!
        </p>

        {error && (
          <div style={{
            color: "#d32f2f",
            padding: "10px",
            backgroundColor: "#ffebee",
            borderRadius: "8px",
            marginBottom: "15px",
            fontSize: "14px",
            textAlign: "center"
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px"
            }}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "10px",
                border: "2px solid #ddd",
                fontSize: "14px",
                transition: "all 0.3s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2575FC")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px"
            }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "10px",
                border: "2px solid #ddd",
                fontSize: "14px",
                transition: "all 0.3s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2575FC")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px"
            }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "10px",
                border: "2px solid #ddd",
                fontSize: "14px",
                transition: "all 0.3s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2575FC")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px"
            }}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "10px",
                border: "2px solid #ddd",
                fontSize: "14px",
                transition: "all 0.3s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2575FC")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#ccc" : "#2575FC",
              border: "none",
              padding: "12px 15px",
              borderRadius: "10px",
              fontWeight: "600",
              width: "100%",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.3s",
              fontSize: "16px"
            }}
            onMouseOver={(e) => {
              if (!loading) e.currentTarget.style.background = "#1A5BDC";
            }}
            onMouseOut={(e) => {
              if (!loading) e.currentTarget.style.background = "#2575FC";
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#666",
          fontSize: "14px"
        }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2575FC",
              fontWeight: "600",
              textDecoration: "none"
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}