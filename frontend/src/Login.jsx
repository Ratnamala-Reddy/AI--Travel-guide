import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill all fields!");
      setLoading(false);
      return;
    }

    try {
      // Try backend authentication first
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      // Save token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Update login state
      setIsLoggedIn(true);
      setLoading(false);
      
      // Redirect to intended page or home
      setTimeout(() => {
        navigate(redirect, { replace: true });
      }, 100);
      
    } catch (error) {
      console.error("Backend login failed, trying localStorage:", error);
      
      // Fallback to localStorage authentication
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        setError("Invalid email or password!");
        setLoading(false);
        return;
      }

      // Mock token for localStorage auth
      const mockToken = `localStorage-token-${Date.now()}`;
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(user));
      
      // Update login state
      setIsLoggedIn(true);
      setLoading(false);
      
      // Redirect to intended page or home
      setTimeout(() => {
        navigate(redirect, { replace: true });
      }, 100);
    }
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
        padding: "50px 40px",
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
          fontWeight: "700",
          color: "#333",
          textAlign: "center",
          marginBottom: "10px"
        }}>
          Welcome Back
        </h2>
        <p style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "30px"
        }}>
          Login to your Go Globe account
        </p>

        {error && (
          <div style={{
            color: "#d32f2f",
            textAlign: "center",
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#ffebee",
            borderRadius: "8px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333"
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#333"
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              disabled={loading}
            />
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            fontSize: "14px"
          }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input type="checkbox" style={{ cursor: "pointer" }} disabled={loading} />
              <span style={{ color: "#666" }}>Remember me</span>
            </label>
            <a href="#" style={{ color: "#2575FC", textDecoration: "none", fontWeight: "600" }}>
              Forgot password?
            </a>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#666"
        }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#2575FC",
              fontWeight: "600",
              textDecoration: "none"
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}