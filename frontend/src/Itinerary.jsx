import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { itineraryPlans } from "./itineraryData";

const API_URL = "http://localhost:5000/api";

export default function Itinerary() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preselectedDestination = queryParams.get("destination");

  const [destination, setDestination] = useState(preselectedDestination || "");
  const [days, setDays] = useState(3);
  const [interest, setInterest] = useState("");
  const [plan, setPlan] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [error, setError] = useState("");

  const destinations = Object.keys(itineraryPlans);
  const interests = ["culture", "food", "adventure"];

  // Auto-fetch weather when destination is preselected
  useEffect(() => {
    if (preselectedDestination && destinations.includes(preselectedDestination)) {
      setDestination(preselectedDestination);
      fetchWeather(preselectedDestination);
    }
  }, [preselectedDestination]);

  const generatePlan = async () => {
    setError("");
    setPlan([]);

    if (!destination || !interest || days < 1) {
      setError("Please fill all fields correctly and select valid options.");
      return;
    }

    if (!itineraryPlans[destination]) {
      setError("Destination data not available. Please select from the list.");
      return;
    }

    if (!itineraryPlans[destination][interest]) {
      setError("Interest type not available for this destination.");
      return;
    }

    const daysNum = parseInt(days);
    if (daysNum > 15) {
      setError("Maximum 15 days itinerary available.");
      return;
    }

    setLoading(true);

    try {
      const fullItinerary = itineraryPlans[destination][interest];
      const selectedDays = fullItinerary.slice(0, daysNum);
      
      setPlan(selectedDays);
      
      // Fetch weather if not already loaded
      if (!weather) {
        await fetchWeather(destination);
      }

      // Save itinerary to backend
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_URL}/itinerary`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              destination,
              days: daysNum,
              interest,
              plan: selectedDays
            })
          });
          if (!response.ok) {
            console.error("Error saving itinerary");
          }
        } catch (error) {
          console.error("Error saving itinerary:", error);
        }
      }
    } catch (error) {
      setError("Error generating itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (city) => {
    if (!city) return;
    
    setWeatherLoading(true);
    setWeather(null);
    
    try {
      // Using fetch instead of axios for better compatibility
      const apiKey = "3045dd712ffe6e702e3245525ac7fa38";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      
      console.log("Fetching weather for:", city);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Weather data:", data);
      
      setWeather(data);
      
    } catch (error) {
      console.error("Weather fetch error:", error);
      // Don't show error to user, just log it
      setWeather(null);
    } finally {
      setWeatherLoading(false);
    }
  };

  const handleDestinationChange = (e) => {
    const newDestination = e.target.value;
    setDestination(newDestination);
    
    if (newDestination) {
      fetchWeather(newDestination);
    } else {
      setWeather(null);
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", backgroundColor: "#F4F6F8", minHeight: "100vh" }}>
      <h2 style={{ color: "#333", marginBottom: "30px", textAlign: "center" }}>Plan Your Perfect Trip</h2>

      {/* Input Section */}
      <div style={{
        background: "white",
        borderRadius: "12px",
        padding: "30px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginBottom: "20px"
        }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
              Destination
            </label>
            <select
              value={destination}
              onChange={handleDestinationChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #ddd",
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif"
              }}
            >
              <option value="">Select Destination</option>
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
              Number of Days (1-15)
            </label>
            <input
              type="number"
              min="1"
              max="15"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #ddd",
                fontSize: "14px"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#333" }}>
              Type of Experience
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #ddd",
                fontSize: "14px",
                fontFamily: "Poppins, sans-serif"
              }}
            >
              <option value="">Select Experience Type</option>
              {interests.map((int) => (
                <option key={int} value={int}>
                  {int.charAt(0).toUpperCase() + int.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div style={{
            color: "#d32f2f",
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#ffebee",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <button
          onClick={generatePlan}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#2575FC",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = "#1A5BDC";
          }}
          onMouseOut={(e) => {
            if (!loading) e.currentTarget.style.backgroundColor = "#2575FC";
          }}
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </div>

      {/* Weather Section */}
      {weatherLoading && destination && (
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "30px",
          marginBottom: "30px",
          textAlign: "center",
          color: "#666"
        }}>
          <div style={{ fontSize: "50px", marginBottom: "15px" }}>🌤️</div>
          <p style={{ fontSize: "16px", margin: 0 }}>Loading weather for {destination}...</p>
        </div>
      )}

      {weather && !weatherLoading && (
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          padding: "25px",
          marginBottom: "30px",
          color: "white",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            marginBottom: "15px",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            <div>
              <h3 style={{ margin: 0, marginBottom: "5px" }}>Weather in {weather.name}</h3>
              <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            {weather.weather && weather.weather[0] && (
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="weather icon"
                style={{ width: "80px", height: "80px" }}
              />
            )}
          </div>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
            gap: "15px" 
          }}>
            {weather.weather && weather.weather[0] && (
              <div style={{
                background: "rgba(255,255,255,0.15)",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <p style={{ margin: "0 0 5px 0", fontSize: "14px", opacity: 0.9 }}>Condition</p>
                <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                  {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
                </p>
              </div>
            )}
            
            {weather.main && (
              <>
                <div style={{
                  background: "rgba(255,255,255,0.15)",
                  padding: "15px",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <p style={{ margin: "0 0 5px 0", fontSize: "14px", opacity: 0.9 }}>Temperature</p>
                  <p style={{ margin: 0, fontSize: "28px", fontWeight: "bold" }}>
                    {Math.round(weather.main.temp)}°C
                  </p>
                </div>
                
                <div style={{
                  background: "rgba(255,255,255,0.15)",
                  padding: "15px",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <p style={{ margin: "0 0 5px 0", fontSize: "14px", opacity: 0.9 }}>Feels Like</p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                    {Math.round(weather.main.feels_like)}°C
                  </p>
                </div>
                
                <div style={{
                  background: "rgba(255,255,255,0.15)",
                  padding: "15px",
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <p style={{ margin: "0 0 5px 0", fontSize: "14px", opacity: 0.9 }}>Humidity</p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                    {weather.main.humidity}%
                  </p>
                </div>
              </>
            )}
            
            {weather.wind && (
              <div style={{
                background: "rgba(255,255,255,0.15)",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <p style={{ margin: "0 0 5px 0", fontSize: "14px", opacity: 0.9 }}>Wind Speed</p>
                <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                  {weather.wind.speed} m/s
                </p>
              </div>
            )}
            
            {weather.main && (
              <div style={{
                background: "rgba(255,255,255,0.15)",
                padding: "15px",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <p style={{ margin: "0 0 5px 0", fontSize: "14px", opacity: 0.9 }}>Pressure</p>
                <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                  {weather.main.pressure} hPa
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Itinerary Plan */}
      {plan.length > 0 && (
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
            Your {days}-Day {interest.toUpperCase()} Itinerary for {destination}
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}>
            {plan.map((activity, idx) => (
              <div
                key={idx}
                style={{
                  border: "2px solid #2575FC",
                  borderRadius: "12px",
                  padding: "20px",
                  backgroundColor: "#f8faff",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 117, 252, 0.2)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h4 style={{
                  color: "#2575FC",
                  marginTop: 0,
                  marginBottom: "10px",
                  fontSize: "16px"
                }}>
                  Day {idx + 1}: {activity.split(":")[0]}
                </h4>
                <p style={{
                  color: "#666",
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "1.6"
                }}>
                  {activity.split(":")[1]?.trim()}
                </p>
              </div>
            ))}
          </div>

          {/* Download Button */}
          <button
            onClick={() => {
              const itineraryText = plan.map((activity, idx) => `Day ${idx + 1}: ${activity}`).join("\n\n");
              const weatherInfo = weather ? `\n\nCurrent Weather in ${destination}:\nTemperature: ${Math.round(weather.main.temp)}°C\nCondition: ${weather.weather[0].description}\nHumidity: ${weather.main.humidity}%\n\n` : '';
              const fullText = `${destination} - ${days} Day ${interest.toUpperCase()} Itinerary\n${'='.repeat(50)}${weatherInfo}\n${itineraryText}`;
              const element = document.createElement("a");
              element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(fullText));
              element.setAttribute("download", `${destination}_${days}day_itinerary.txt`);
              element.style.display = "none";
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
            style={{
              marginTop: "25px",
              padding: "12px 30px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              display: "block",
              margin: "25px auto 0"
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
          >
            📥 Download Itinerary
          </button>
        </div>
      )}

      {plan.length === 0 && !error && (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#999"
        }}>
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>✈️</div>
          <p style={{ fontSize: "18px" }}>Select your preferences and click "Generate Itinerary" to create your personalized travel plan!</p>
        </div>
      )}
    </div>
  );
}