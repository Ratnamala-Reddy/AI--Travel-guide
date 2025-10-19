import React from "react";
import { useNavigate } from "react-router-dom";
import image from "./image.png";
import "./Home.css";
import card1 from "./images/card1.png";
import card2 from "./images/card2.png";
import card3 from "./images/card3.png";
import card4 from "./images/card4.png";
import card5 from "./images/card5.png";
import card6 from "./images/card6.png";
import card7 from "./images/card7.png";
import card8 from "./images/card8.png";
import card9 from "./images/card9.png";

export default function Home() {
  const navigate = useNavigate();

  const destinations = [
    { img: card1, title: "Paris", desc: "The city of lights — art, cafés, and romance." },
    { img: card2, title: "Australia", desc: "Vibrant cities, beaches, and wildlife adventures." },
    { img: card3, title: "Egypt", desc: "Explore pyramids, deserts, and the Nile River." },
    { img: card4, title: "India", desc: "A colorful blend of culture, food, and festivals." },
    { img: card5, title: "Singapore", desc: "Futuristic skyline, gardens, and rich cuisine." },
    { img: card6, title: "Spain", desc: "Historic landmarks and lively Mediterranean vibes." },
    { img: card7, title: "Los Angeles", desc: "Hollywood glamour meets sunny beaches." },
    { img: card8, title: "Japan", desc: "Modern cities, cherry blossoms, and ancient temples." },
    { img: card9, title: "Dubai", desc: "Luxury, innovation, and desert adventures." },
  ];

  const getRandomCost = () => Math.floor(Math.random() * 90000 + 10000);
  const getRandomDays = () => Math.floor(Math.random() * 10 + 3);

  const handleViewDetails = (destination) => {
    const isLoggedIn = !!localStorage.getItem("token");
    
    if (!isLoggedIn) {
      alert("Please login to view details");
      navigate("/login?redirect=/itinerary");
      return;
    }

    // Navigate to itinerary with destination parameter
    navigate(`/itinerary?destination=${destination}`);
  };

  const handleStartPlanning = () => {
    const isLoggedIn = !!localStorage.getItem("token");
    
    if (!isLoggedIn) {
      alert("Please login to start planning");
      navigate("/login?redirect=/itinerary");
      return;
    }

    navigate("/itinerary");
  };

  return (
    <div style={{ backgroundColor: "#F4F6F8", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "12px",
          margin: "20px",
        }}
      >
        <img
          src={image}
          alt="Hero"
          style={{
            width: "100%",
            height: "550px",
            objectFit: "cover",
            filter: "brightness(65%)",
          }}
        />
        <h1
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          Explore the World with Go Globe
        </h1>
        <button
          onClick={handleStartPlanning}
          style={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#2575FC",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: "20px",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#1A5BDC")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#2575FC")}
        >
          Start Planning
        </button>
      </div>

      <h2 style={{ textAlign: "center", color: "#333", margin: "20px 0" }}>
        "Your Next Adventure Awaits Beyond the Horizon."
      </h2>
      <h2 style={{ marginLeft: "190px", color: "#2575FC" }}>Our Tops Intresting Trips !!</h2>

      {/* Cards Section */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {destinations.map((place, index) => (
            <div
              key={index}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.3s",
                height: "320px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={place.img}
                alt={place.title}
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
              />
              <div style={{ padding: "10px", textAlign: "center" }}>
                <h5 style={{ color: "#2575FC" }}>{place.title}</h5>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>{place.desc}</p>
                <p
                  style={{
                    color: "#333",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                  }}
                >
                  ₹{getRandomCost()} • {getRandomDays()} Days
                </p>
                <button
                  onClick={() => handleViewDetails(place.title)}
                  style={{
                    backgroundColor: "#2575FC",
                    border: "none",
                    padding: "6px 12px",
                    color: "#fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#1A5BDC")}
                  onMouseOut={(e) => (e.target.style.background = "#2575FC")}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "linear-gradient(135deg, #2575FC, #6A11CB)",
          color: "white",
          textAlign: "center",
          padding: "30px 10px",
          marginTop: "50px",
        }}
      >
        <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>Go Globe</h4>
        <p>
          Discover new destinations, plan your trips, and make memories that
          last forever.
        </p>
        <div style={{ marginTop: "15px" }}>
          <a
            href="#"
            style={{ color: "white", margin: "0 10px", textDecoration: "none" }}
          >
            🌐 Facebook
          </a>
          <a
            href="#"
            style={{ color: "white", margin: "0 10px", textDecoration: "none" }}
          >
            📸 Instagram
          </a>
          <a
            href="#"
            style={{ color: "white", margin: "0 10px", textDecoration: "none" }}
          >
            🐦 Twitter
          </a>
        </div>
        <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          © 2025 Go Globe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}