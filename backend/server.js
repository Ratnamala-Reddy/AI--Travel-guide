import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields!");
      return;
    }

    // Show success message
    alert("Message sent successfully! We'll get back to you soon.");
    
    // Clear form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div>
      <style>{`
        body {
          background-color: #F4F6F8;
          font-family: 'Poppins', sans-serif;
        }

        .contact-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }

        .contact-card {
          background: #fff;
          border-radius: 20px;
          padding: 40px 35px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          animation: popin 0.6s forwards;
        }

        @keyframes popin {
          0% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }

        .contact-card h2 {
          font-weight: 700;
          color: #333;
          text-align: center;
          margin-bottom: 10px;
        }

        .contact-card p {
          text-align: center;
          color: #666;
          margin-bottom: 25px;
        }

        .contact-card .form-control {
          border-radius: 10px;
          padding: 12px 15px;
          margin-bottom: 15px;
          border: 2px solid #ddd;
          transition: all 0.3s;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        .contact-card .form-control:focus {
          border-color: #2575FC;
          box-shadow: 0 0 10px rgba(37,117,252,0.3);
          outline: none;
        }

        .contact-card button {
          background-color: #2575FC;
          border: none;
          padding: 12px 15px;
          border-radius: 10px;
          font-weight: 500;
          width: 100%;
          color: #fff;
          cursor: pointer;
          transition: 0.3s;
          font-size: 16px;
        }

        .contact-card button:hover {
          background-color: #1A5BDC;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="contact-container">
        <div className="contact-card">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you! Send us a message below.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              className="form-control"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              className="form-control"
              rows="5"
              placeholder="Your Message *"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}