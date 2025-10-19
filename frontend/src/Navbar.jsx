import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import login from "./login.png"; // ✅ Make sure the path is correct

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuggestedTrips, setShowSuggestedTrips] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Suggested trips data
  const suggestedTrips = [
    { name: "Paris", emoji: "🗼", desc: "Romantic city of lights", price: "₹85,000" },
    { name: "Tokyo", emoji: "🗾", desc: "Modern meets traditional", price: "₹95,000" },
    { name: "Dubai", emoji: "🏙️", desc: "Luxury and innovation", price: "₹75,000" },
    { name: "Bali", emoji: "🏝️", desc: "Tropical paradise", price: "₹65,000" },
    { name: "New York", emoji: "🗽", desc: "The city that never sleeps", price: "₹1,20,000" },
    { name: "London", emoji: "🎡", desc: "Historic British capital", price: "₹90,000" }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/login");
  };

  const getLinkStyle = (path) => ({
    position: "relative",
    color: location.pathname === path ? "#2575FC" : "#333",
    fontWeight: location.pathname === path ? "600" : "400",
    textDecoration: "none",
    margin: "0 15px",
    paddingBottom: "5px",
    borderBottom: location.pathname === path ? "3px solid #2575FC" : "3px solid transparent",
    transition: "all 0.3s ease",
  });

  const handleTripClick = (tripName) => {
    setShowSuggestedTrips(false);
    navigate(`/itinerary?destination=${tripName}`);
  };

  return (
    <nav
      style={{
        background: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "15px 30px",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            fontSize: "1.6rem",
            background: "linear-gradient(90deg, #2575FC, #6A11CB, #2575FC)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none"
          }}
        >
          Go Globe
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <Link to="/" style={getLinkStyle("/")}>
            Home
          </Link>
          <Link to="/itinerary" style={getLinkStyle("/itinerary")}>
            Itinerary
          </Link>

          {/* Suggested Trips Dropdown */}
          <div style={{ position: "relative" }}>
            <Link to="/suggested-trips" style={getLinkStyle("/suggested-trips")}>
              Suggested Trips
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowSuggestedTrips(!showSuggestedTrips);
              }}
              style={{
                background: "none",
                border: "none",
                color: location.pathname === "/suggested-trips" ? "#2575FC" : "#333",
                cursor: "pointer",
                fontSize: "12px",
                marginLeft: "5px",
                padding: 0
              }}
            >
              ▾
            </button>

            {showSuggestedTrips && (
              <div
                style={{
                  position: "absolute",
                  top: "35px",
                  left: "-50%",
                  background: "#fff",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  borderRadius: "12px",
                  padding: "15px",
                  zIndex: 100,
                  minWidth: "320px",
                  maxHeight: "400px",
                  overflowY: "auto"
                }}
              >
                {suggestedTrips.map((trip, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleTripClick(trip.name)}
                    style={{
                      padding: "12px 15px",
                      cursor: "pointer",
                      borderRadius: "8px",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#f0f7ff";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>{trip.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "600", color: "#333", marginBottom: "2px" }}>
                        {trip.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>{trip.desc}</div>
                    </div>
                    <div style={{ fontWeight: "600", color: "#2575FC", fontSize: "14px" }}>
                      {trip.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" style={getLinkStyle("/contact")}>
            Contact
          </Link>
        </div>

        {/* Profile / Logout Dropdown */}
        <div style={{ position: "relative" }}>
          <img
            src={login} // ✅ Fixed this line
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid #2575FC"
            }}
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: 0,
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "8px",
                padding: "10px",
                zIndex: 10,
                minWidth: "150px"
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "#d32f2f",
                  fontWeight: "600",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  transition: "0.2s"
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ffebee")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
