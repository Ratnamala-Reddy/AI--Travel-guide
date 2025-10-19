import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// All available destinations from itineraryData
const availableDestinations = [
  "Paris", "Tokyo", "Dubai", "Bali", "New York", "London", 
  "Japan", "India", "Egypt", "Spain", "Australia", "Singapore",
  "Los Angeles", "Italy", "Germany", "Thailand", "Canada", "Brazil",
  "South Africa", "Switzerland", "Greece", "Turkey", "Indonesia",
  "Malaysia", "Vietnam", "China", "UK", "Mexico", "New Zealand",
  "Norway", "Morocco", "Portugal"
];

// Emoji mapping for destinations
const destinationEmojis = {
  "Paris": "🗼", "Tokyo": "🗾", "Dubai": "🏙️", "Bali": "🏝️",
  "New York": "🗽", "London": "🎡", "Japan": "🎌", "India": "🕌",
  "Egypt": "🐪", "Spain": "🎭", "Australia": "🦘", "Singapore": "🦁",
  "Los Angeles": "🎬", "Italy": "🍕", "Germany": "🍺", "Thailand": "🐘",
  "Canada": "🍁", "Brazil": "⚽", "South Africa": "🦁", "Switzerland": "🏔️",
  "Greece": "🏛️", "Turkey": "🕌", "Indonesia": "🌴", "Malaysia": "🏙️",
  "Vietnam": "🍜", "China": "🐉", "UK": "☕", "Mexico": "🌮",
  "New Zealand": "🥝", "Norway": "❄️", "Morocco": "🐫", "Portugal": "🌊"
};

// Destination highlights and best time to visit data
const destinationDetails = {
  "Paris": {
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Champs-Élysées", "Seine River Cruise"],
    bestTime: "April to June & September to October",
    description: "The City of Light offering romantic ambiance and world-class art"
  },
  "Tokyo": {
    highlights: ["Shibuya Crossing", "Tokyo Skytree", "Sensoji Temple", "Meiji Shrine", "Tsukiji Fish Market"],
    bestTime: "March to May & September to November",
    description: "A vibrant blend of traditional culture and futuristic technology"
  },
  "Dubai": {
    highlights: ["Burj Khalifa", "Palm Jumeirah", "Desert Safari", "Dubai Mall", "Miracle Garden"],
    bestTime: "November to March",
    description: "Ultra-modern city with luxury shopping and stunning architecture"
  },
  "Bali": {
    highlights: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Mount Batur Sunrise", "Ubud Art Market", "Beach Clubs"],
    bestTime: "April to October (Dry season)",
    description: "Tropical paradise with stunning beaches and rich cultural heritage"
  },
  "New York": {
    highlights: ["Statue of Liberty", "Times Square", "Central Park", "Empire State Building", "Broadway Shows"],
    bestTime: "April to June & September to November",
    description: "The city that never sleeps with iconic landmarks and vibrant culture"
  },
  "London": {
    highlights: ["Big Ben", "London Eye", "Buckingham Palace", "Tower Bridge", "British Museum"],
    bestTime: "May to September",
    description: "Historic city with royal heritage and modern attractions"
  },
  "Japan": {
    highlights: ["Mount Fuji", "Kyoto Temples", "Osaka Castle", "Hiroshima Peace Park", "Bullet Train Experience"],
    bestTime: "March to May & September to November",
    description: "Land of contrasts with ancient traditions and cutting-edge technology"
  },
  "India": {
    highlights: ["Taj Mahal", "Jaipur Palaces", "Kerala Backwaters", "Varanasi Ghats", "Goa Beaches"],
    bestTime: "October to March",
    description: "Incredible diversity of cultures, landscapes, and ancient history"
  },
  "Egypt": {
    highlights: ["Pyramids of Giza", "Sphinx", "Luxor Temple", "Nile Cruise", "Valley of the Kings"],
    bestTime: "October to April",
    description: "Ancient civilization with monumental architecture and rich history"
  },
  "Spain": {
    highlights: ["Sagrada Familia", "Alhambra Palace", "Park Güell", "Prado Museum", "Flamenco Shows"],
    bestTime: "April to June & September to October",
    description: "Vibrant culture, stunning architecture, and beautiful coastlines"
  },
  "Australia": {
    highlights: ["Sydney Opera House", "Great Barrier Reef", "Uluru", "Gold Coast", "Melbourne Laneways"],
    bestTime: "September to November & March to May",
    description: "Diverse landscapes from stunning coastlines to vast outback"
  },
  "Singapore": {
    highlights: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island", "Orchard Road", "Chinatown"],
    bestTime: "February to April",
    description: "Modern city-state with lush gardens and diverse cultural influences"
  },
  "Los Angeles": {
    highlights: ["Hollywood Sign", "Santa Monica Pier", "Universal Studios", "Beverly Hills", "Venice Beach"],
    bestTime: "March to May & September to November",
    description: "Entertainment capital with beaches, studios, and vibrant neighborhoods"
  },
  "Italy": {
    highlights: ["Colosseum Rome", "Venice Canals", "Florence Art", "Amalfi Coast", "Tuscan Countryside"],
    bestTime: "April to June & September to October",
    description: "Rich history, Renaissance art, and world-renowned cuisine"
  },
  "Germany": {
    highlights: ["Neuschwanstein Castle", "Berlin Wall", "Cologne Cathedral", "Black Forest", "Oktoberfest"],
    bestTime: "May to September",
    description: "Fairytale castles, historic cities, and vibrant beer culture"
  },
  "Thailand": {
    highlights: ["Grand Palace Bangkok", "Phi Phi Islands", "Chiang Mai Temples", "Floating Markets", "Full Moon Party"],
    bestTime: "November to February",
    description: "Land of smiles with beautiful islands and rich culture"
  },
  "Canada": {
    highlights: ["Niagara Falls", "Banff National Park", "CN Tower", "Old Quebec", "Whistler Mountain"],
    bestTime: "June to August & September to October",
    description: "Breathtaking natural landscapes and vibrant multicultural cities"
  },
  "Brazil": {
    highlights: ["Christ the Redeemer", "Iguazu Falls", "Amazon Rainforest", "Copacabana Beach", "Carnival Rio"],
    bestTime: "December to March",
    description: "Vibrant culture, stunning beaches, and incredible natural wonders"
  },
  "South Africa": {
    highlights: ["Table Mountain", "Kruger National Park", "Cape of Good Hope", "Robben Island", "Wine Regions"],
    bestTime: "May to September",
    description: "Diverse wildlife, stunning landscapes, and rich cultural heritage"
  },
  "Switzerland": {
    highlights: ["Jungfraujoch", "Lake Geneva", "Matterhorn", "Lucerne", "Bernese Oberland"],
    bestTime: "June to September & December to March",
    description: "Breathtaking alpine scenery with pristine lakes and charming villages"
  },
  "Greece": {
    highlights: ["Acropolis Athens", "Santorini Sunsets", "Mykonos Windmills", "Delphi Ruins", "Crete Beaches"],
    bestTime: "April to June & September to October",
    description: "Ancient history, stunning islands, and crystal-clear waters"
  },
  "Turkey": {
    highlights: ["Hagia Sophia", "Cappadocia Hot Air Balloons", "Ephesus Ruins", "Pamukkale Thermal Pools", "Bosphorus Cruise"],
    bestTime: "April to May & September to October",
    description: "Where East meets West with rich history and diverse landscapes"
  },
  "Indonesia": {
    highlights: ["Borobudur Temple", "Komodo Island", "Mount Bromo", "Gili Islands", "Jakarta Culture"],
    bestTime: "April to October",
    description: "Archipelago of diverse cultures, volcanoes, and pristine beaches"
  },
  "Malaysia": {
    highlights: ["Petronas Towers", "Langkawi Islands", "Borneo Rainforest", "Penang Street Art", "Cameron Highlands"],
    bestTime: "December to February & June to August",
    description: "Tropical paradise with modern cities and ancient rainforests"
  },
  "Vietnam": {
    highlights: ["Ha Long Bay", "Hoi An Ancient Town", "Saigon Markets", "Sapa Rice Terraces", "Mekong Delta"],
    bestTime: "November to April",
    description: "Stunning natural beauty, rich history, and delicious cuisine"
  },
  "China": {
    highlights: ["Great Wall", "Forbidden City", "Terracotta Army", "Li River Cruise", "Pandas Chengdu"],
    bestTime: "April to May & September to October",
    description: "Ancient civilization with modern cities and diverse landscapes"
  },
  "UK": {
    highlights: ["Stonehenge", "Edinburgh Castle", "Lake District", "Oxford University", "Scottish Highlands"],
    bestTime: "May to September",
    description: "Rich history, royal heritage, and stunning countryside"
  },
  "Mexico": {
    highlights: ["Chichen Itza", "Cancun Beaches", "Mexico City Zocalo", "Tulum Ruins", "Copper Canyon"],
    bestTime: "December to April",
    description: "Ancient ruins, vibrant culture, and beautiful beaches"
  },
  "New Zealand": {
    highlights: ["Milford Sound", "Rotorua Geysers", "Queenstown Adventure", "Aoraki Mount Cook", "Bay of Islands"],
    bestTime: "December to February",
    description: "Stunning natural landscapes and adventure activities"
  },
  "Norway": {
    highlights: ["Northern Lights", "Fjords Cruise", "Bergen Bryggen", "Viking History", "Midnight Sun"],
    bestTime: "June to August & December to February",
    description: "Breathtaking fjords, northern lights, and Viking heritage"
  },
  "Morocco": {
    highlights: ["Marrakech Medina", "Sahara Desert", "Fes Tanneries", "Chefchaouen Blue City", "Atlas Mountains"],
    bestTime: "March to May & September to November",
    description: "Exotic markets, desert landscapes, and rich cultural heritage"
  },
  "Portugal": {
    highlights: ["Lisbon Trams", "Porto Wine Cellars", "Algarve Beaches", "Sintra Palaces", "Douro Valley"],
    bestTime: "March to May & September to October",
    description: "Historic cities, stunning coastlines, and world-famous wine"
  }
};

// Pre-curated destination data for the curated tab
const curatedDestinations = [
  "Paris", "Tokyo", "Bali", "Switzerland", "Thailand", "Dubai", "Italy", "Australia"
].map(dest => ({
  name: dest,
  ...destinationDetails[dest],
  emoji: destinationEmojis[dest],
  price: `₹${Math.floor(Math.random() * 90000 + 60000).toLocaleString()}`,
  days: `${Math.floor(Math.random() * 8 + 5)} Days`
}));

// Helper function to get destination details safely
const getDestinationDetails = (destinationName) => {
  const details = destinationDetails[destinationName];
  if (!details) {
    // Return default details if destination not found
    return {
      highlights: ["Cultural experiences", "Local attractions", "Scenic views", "Historical sites", "Local cuisine"],
      bestTime: "Year-round destination",
      description: "Beautiful destination with amazing experiences and rich culture"
    };
  }
  return details;
};

export default function SuggestedTrips() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("search");

  // Fetch Wikipedia summary
  const fetchWikipediaSummary = async (country) => {
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(country)}`,
        { timeout: 5000 }
      );
      return response.data.extract || "";
    } catch (err) {
      console.error(`Error fetching Wikipedia for ${country}:`, err);
      return "";
    }
  };

  // Calculate text similarity using word overlap
  const calculateSimilarity = (text1, text2) => {
    if (!text1 || !text2) return 0;
    
    const getWords = (text) => {
      return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter(word => word.length > 3);
    };

    const words1 = getWords(text1);
    const words2 = getWords(text2);
    
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    const commonWords = [...set1].filter(word => set2.has(word));
    const union = new Set([...set1, ...set2]);
    return commonWords.length / union.size;
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setError("Please enter a country or destination name.");
      return;
    }

    setError("");
    setSuggestions([]);
    setLoading(true);
    setIsAvailable(null);
    
    const normalizedInput = searchInput.trim();
    setSearchCountry(normalizedInput);

    try {
      // Check if destination is in our list (case-insensitive)
      const exactMatch = availableDestinations.find(
        dest => dest.toLowerCase() === normalizedInput.toLowerCase()
      );

      if (exactMatch) {
        setIsAvailable(true);
        setLoading(false);
        
        if (!searchHistory.includes(exactMatch)) {
          setSearchHistory(prev => [exactMatch, ...prev].slice(0, 5));
        }
        return;
      }

      // Destination not available - find similar ones
      setIsAvailable(false);
      
      const searchSummary = await fetchWikipediaSummary(normalizedInput);
      
      if (!searchSummary) {
        setError("Could not find information about this destination. Please check the spelling.");
        setLoading(false);
        return;
      }

      // Calculate similarity with all available destinations
      const similarityScores = await Promise.all(
        availableDestinations.map(async (destination) => {
          const destSummary = await fetchWikipediaSummary(destination);
          const similarity = calculateSimilarity(searchSummary, destSummary);
          const details = getDestinationDetails(destination);
          
          return {
            name: destination,
            emoji: destinationEmojis[destination] || "🌍",
            similarity: similarity,
            price: `₹${Math.floor(Math.random() * 90000 + 60000).toLocaleString()}`,
            days: `${Math.floor(Math.random() * 8 + 5)} Days`,
            highlights: details.highlights,
            bestTime: details.bestTime,
            description: details.description
          };
        })
      );

      // Sort by similarity and get top 5
      const topSuggestions = similarityScores
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5)
        .map(item => ({
          ...item,
          matchReason: getMatchReason(item.similarity)
        }));

      setSuggestions(topSuggestions);
      
      // Save to backend if logged in
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await axios.post(
            "http://localhost:5000/api/suggestions/save",
            {
              searchedCountry: normalizedInput,
              suggestions: topSuggestions,
              preferences: {}
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (saveError) {
        console.error("Error saving search:", saveError);
      }

    } catch (err) {
      console.error("Search error:", err);
      setError("Error searching for destinations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Better match reason based on similarity score
  const getMatchReason = (similarity) => {
    if (similarity > 0.4) return "Highly similar destination";
    if (similarity > 0.25) return "Similar culture & attractions";
    if (similarity > 0.15) return "Comparable travel experience";
    return "Popular alternative destination";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePlanTrip = (destination) => {
    navigate(`/itinerary?destination=${encodeURIComponent(destination)}`);
  };

  // Safe highlights render function - REMOVED +2 more option
  const renderHighlights = (highlights) => {
    if (!highlights || !Array.isArray(highlights)) {
      return (
        <span style={{
          padding: "4px 8px",
          backgroundColor: "#f0f0f0",
          color: "#666",
          borderRadius: "12px",
          fontSize: "12px"
        }}>
          Amazing experiences
        </span>
      );
    }

    // Show only first 3 highlights without the "+ more" option
    const displayHighlights = highlights.slice(0, 3);

    return (
      <>
        {displayHighlights.map((highlight, hIdx) => (
          <span
            key={hIdx}
            style={{
              padding: "4px 8px",
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              borderRadius: "12px",
              fontSize: "12px",
              border: "1px solid #bbdefb"
            }}
          >
            {highlight}
          </span>
        ))}
      </>
    );
  };

  // Render curated destinations tab
  const renderCuratedDestinations = () => (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "30px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      marginTop: "20px"
    }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h3 style={{ color: "#2575FC", marginBottom: "10px" }}>
          Handpicked Destinations Just For You 🌟
        </h3>
        <p style={{ color: "#666", fontSize: "1.05rem" }}>
          Discover our carefully curated selection of amazing destinations with detailed information
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "25px"
      }}>
        {curatedDestinations.map((destination, idx) => (
          <div
            key={idx}
            style={{
              border: "2px solid #2575FC",
              borderRadius: "12px",
              padding: "25px",
              backgroundColor: "#f8faff",
              transition: "all 0.3s",
              cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 117, 252, 0.2)";
              e.currentTarget.style.transform = "translateY(-5px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ 
              fontSize: "3rem", 
              textAlign: "center",
              marginBottom: "15px" 
            }}>
              {destination.emoji}
            </div>
            
            <h4 style={{
              color: "#2575FC",
              margin: "0 0 10px 0",
              fontSize: "1.4rem",
              textAlign: "center",
              fontWeight: "700"
            }}>
              {destination.name}
            </h4>

            <p style={{
              color: "#666",
              textAlign: "center",
              marginBottom: "15px",
              fontSize: "14px",
              lineHeight: "1.4"
            }}>
              {destination.description}
            </p>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              padding: "10px 0",
              borderBottom: "1px solid #e0e0e0"
            }}>
              <span style={{ color: "#666", fontSize: "14px", fontWeight: "600" }}>
                {destination.days}
              </span>
              <span style={{ 
                color: "#2575FC", 
                fontWeight: "700",
                fontSize: "16px"
              }}>
                {destination.price}
              </span>
            </div>

            {/* Highlights Section */}
            <div style={{ marginBottom: "15px" }}>
              <h5 style={{
                color: "#333",
                margin: "0 0 8px 0",
                fontSize: "14px",
                fontWeight: "600"
              }}>
                🎯 Key Highlights:
              </h5>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px"
              }}>
                {renderHighlights(destination.highlights)}
              </div>
            </div>

            {/* Best Time to Visit */}
            <div style={{
              padding: "10px 12px",
              backgroundColor: "#e8f5e8",
              borderRadius: "8px",
              marginBottom: "15px"
            }}>
              <h5 style={{
                color: "#2e7d32",
                margin: "0 0 5px 0",
                fontSize: "13px",
                fontWeight: "600"
              }}>
                🌤️ Best Time to Visit:
              </h5>
              <p style={{
                margin: 0,
                fontSize: "13px",
                color: "#2e7d32"
              }}>
                {destination.bestTime || "Year-round destination"}
              </p>
            </div>

            <button
              onClick={() => handlePlanTrip(destination.name)}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#2575FC",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1A5BDC"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2575FC"}
            >
              Plan Your Trip to {destination.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: "1100px",
      margin: "0 auto",
      backgroundColor: "#F4F6F8",
      minHeight: "100vh"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ 
          color: "#333", 
          marginBottom: "10px",
          fontSize: "2rem",
          fontWeight: "700"
        }}>
          Find Your Perfect Destination
        </h2>
        <p style={{ color: "#666", fontSize: "1.1rem" }}>
          Search for destinations or explore our handpicked recommendations
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
        background: "white",
        borderRadius: "12px",
        padding: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
      }}>
        <button
          onClick={() => setActiveTab("search")}
          style={{
            padding: "12px 30px",
            backgroundColor: activeTab === "search" ? "#2575FC" : "transparent",
            color: activeTab === "search" ? "#fff" : "#666",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s",
            margin: "0 5px"
          }}
        >
          🔍 Search Destinations
        </button>
        <button
          onClick={() => setActiveTab("curated")}
          style={{
            padding: "12px 30px",
            backgroundColor: activeTab === "curated" ? "#2575FC" : "transparent",
            color: activeTab === "curated" ? "#fff" : "#666",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "all 0.3s",
            margin: "0 5px"
          }}
        >
          🌟 Curated Suggestions
        </button>
      </div>

      {/* Search Tab Content */}
      {activeTab === "search" && (
        <>
          {/* Search Box */}
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            marginBottom: "30px"
          }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Enter country or destination name (e.g., France, Maldives, Iceland)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  flex: 1,
                  padding: "14px 18px",
                  borderRadius: "8px",
                  border: "2px solid #ddd",
                  fontSize: "16px",
                  transition: "all 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#2575FC"}
                onBlur={(e) => e.target.style.borderColor = "#ddd"}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                style={{
                  padding: "14px 30px",
                  backgroundColor: loading ? "#ccc" : "#2575FC",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.3s",
                  minWidth: "120px"
                }}
                onMouseOver={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = "#1A5BDC";
                }}
                onMouseOut={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = "#2575FC";
                }}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>

            {error && (
              <div style={{
                marginTop: "15px",
                padding: "12px",
                backgroundColor: "#ffebee",
                color: "#d32f2f",
                borderRadius: "8px",
                fontSize: "14px"
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Search History */}
            {searchHistory.length > 0 && !searchCountry && (
              <div style={{ marginTop: "20px" }}>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
                  Recent searches:
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {searchHistory.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSearchInput(item);
                        handleSearch();
                      }}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#f0f7ff",
                        color: "#2575FC",
                        border: "1px solid #2575FC",
                        borderRadius: "20px",
                        cursor: "pointer",
                        fontSize: "13px"
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results - Destination Available */}
          {isAvailable === true && (
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "15px" }}>
                {destinationEmojis[searchCountry] || "🌍"}
              </div>
              <h3 style={{ color: "#4CAF50", marginBottom: "10px" }}>
                Great News! We Have This Destination! 🎉
              </h3>
              <p style={{ color: "#666", marginBottom: "20px", fontSize: "1.1rem" }}>
                <strong>{searchCountry}</strong> is available in our travel packages
              </p>
              <button
                onClick={() => handlePlanTrip(searchCountry)}
                style={{
                  padding: "12px 30px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
              >
                Plan Your Trip to {searchCountry}
              </button>
            </div>
          )}

          {/* Results - Similar Destinations */}
          {isAvailable === false && suggestions.length > 0 && (
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h3 style={{ color: "#FF9800", marginBottom: "10px" }}>
                  We don't have <strong>{searchCountry}</strong> yet
                </h3>
                <p style={{ color: "#666", fontSize: "1.05rem" }}>
                  But here are our top 5 similar destinations you might love! 🌟
                </p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "25px"
              }}>
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: "2px solid #2575FC",
                      borderRadius: "12px",
                      padding: "25px",
                      backgroundColor: "#f8faff",
                      transition: "all 0.3s",
                      cursor: "pointer"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 117, 252, 0.2)";
                      e.currentTarget.style.transform = "translateY(-5px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ 
                      fontSize: "3rem", 
                      textAlign: "center",
                      marginBottom: "15px" 
                    }}>
                      {suggestion.emoji}
                    </div>
                    
                    <h4 style={{
                      color: "#2575FC",
                      margin: "0 0 10px 0",
                      fontSize: "1.4rem",
                      textAlign: "center",
                      fontWeight: "700"
                    }}>
                      {suggestion.name}
                    </h4>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                      padding: "10px 0",
                      borderBottom: "1px solid #e0e0e0"
                    }}>
                      <span style={{ color: "#666", fontSize: "14px", fontWeight: "600" }}>
                        {suggestion.days}
                      </span>
                      <span style={{ 
                        color: "#2575FC", 
                        fontWeight: "700",
                        fontSize: "16px"
                      }}>
                        {suggestion.price}
                      </span>
                    </div>

                    {/* Match Reason */}
                    <div style={{
                      padding: "8px 12px",
                      backgroundColor: "#e3f2fd",
                      borderRadius: "6px",
                      marginBottom: "15px"
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#1976d2",
                        textAlign: "center",
                        fontWeight: "600"
                      }}>
                        {suggestion.matchReason}
                      </p>
                    </div>

                    {/* Highlights Section */}
                    <div style={{ marginBottom: "15px" }}>
                      <h5 style={{
                        color: "#333",
                        margin: "0 0 8px 0",
                        fontSize: "14px",
                        fontWeight: "600"
                      }}>
                        🎯 Key Highlights:
                      </h5>
                      <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px"
                      }}>
                        {renderHighlights(suggestion.highlights)}
                      </div>
                    </div>

                    {/* Best Time to Visit */}
                    <div style={{
                      padding: "10px 12px",
                      backgroundColor: "#e8f5e8",
                      borderRadius: "8px",
                      marginBottom: "15px"
                    }}>
                      <h5 style={{
                        color: "#2e7d32",
                        margin: "0 0 5px 0",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}>
                        🌤️ Best Time to Visit:
                      </h5>
                      <p style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#2e7d32"
                      }}>
                        {suggestion.bestTime || "Year-round destination"}
                      </p>
                    </div>

                    <button
                      onClick={() => handlePlanTrip(suggestion.name)}
                      style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#2575FC",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "600",
                        transition: "all 0.3s"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#1A5BDC"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#2575FC"}
                    >
                      Plan Trip to {suggestion.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Destinations Info */}
          {!searchCountry && (
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "30px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              marginTop: "30px"
            }}>
              <h3 style={{ color: "#333", marginBottom: "15px", textAlign: "center" }}>
                Our Available Destinations
              </h3>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center"
              }}>
                {availableDestinations.map((dest, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "8px 15px",
                      backgroundColor: "#f0f7ff",
                      color: "#2575FC",
                      borderRadius: "20px",
                      fontSize: "14px",
                      border: "1px solid #2575FC"
                    }}
                  >
                    {destinationEmojis[dest]} {dest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Curated Destinations Tab Content */}
      {activeTab === "curated" && renderCuratedDestinations()}
    </div>
  );
}