import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Contact from './Contact';
import Itinerary from './Itinerary';
import SuggestedTrips from './SuggestedTrips';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Monitor token changes (for when user logs in/out)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        setIsLoggedIn(!!e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#2575FC'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Auth routes - redirect if already logged in */}
        <Route 
          path="/login" 
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          } 
        />
        
        <Route 
          path="/signup" 
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Signup setIsLoggedIn={setIsLoggedIn} />
            )
          } 
        />

        {/* Protected routes */}
        <Route
          path="/contact"
          element={
            isLoggedIn ? (
              <Contact />
            ) : (
              <Navigate to="/login?redirect=/contact" replace />
            )
          }
        />
        
        <Route
          path="/itinerary"
          element={
            isLoggedIn ? (
              <Itinerary />
            ) : (
              <Navigate to="/login?redirect=/itinerary" replace />
            )
          }
        />
        
        <Route
          path="/suggested-trips"
          element={
            isLoggedIn ? (
              <SuggestedTrips />
            ) : (
              <Navigate to="/login?redirect=/suggested-trips" replace />
            )
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;