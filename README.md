# AI--Travel-guide# 🌍 AI Travel Guide – Personalized Tour Planner

## 🧠 Overview
**AI Travel Guide** It is a MERN-stack web application designed to serve as a personal AI travel assistant.
It enables users to create customized itineraries based on their travel preferences and discover suggested trips generated using smart algorithms and web scraping.
The app includes two main sections:

### 🗺️ Itinerary Builder
- Collects user inputs like **destination**, **no.of days to  travel**, and **interests**.  
- Generates **day-wise or activity-wise travel plans** using offline logic.  
- Provides smart recommendations without using paid AI APIs (OpenAI not used).  

### ✈️ Suggested Trips
- Displays **pre-curated destinations** using **web scraping**.  
- Shows brief details such as **location**, **highlights**, and **best time to travel**.  
- Helps users discover new travel ideas and experiences.

---

## 🌤️ Additional (Optional) Ideas Implemented
- Integrated **login and signup** using **MongoDB**, allowing users to securely access personalized content.  
- Clean **React UI** for smooth navigation and responsive design.  
- Future-ready architecture to integrate weather APIs or AI responses later. 
- Weather Reort at particular region is also given using weather API 

---

## 🧩 Tech Stack

### 🖥️ Frontend
- **React.js** – Component-based, fast UI rendering  
- **Axios** – For connecting to backend APIs  
- **React Router DOM** – For smooth page navigation  
- **CSS / Bootstrap / Tailwind** – For layout and styling  
- **React Icons** – For modern icons  

### ⚙️ Backend
- **Node.js + Express.js** – REST API creation and request handling  
- **Web Scraping** – Fetching trip data dynamically  
- **MongoDB** – User authentication and data storage  

---

## 📁 Project Structure
```
AI-Travel-Guide/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── Itinerary.jsx
│   │   ├── itineraryData.jsx
│   │   ├── SuggestedTrips.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Contact.jsx
│   │   ├── App.css / Home.css / login.css
│   │   └── images/
│   │       ├── image.png | login.png | small.png
│   └── package.json
└── README.md

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/AI-Travel-Guide.git
cd AI-Travel-Guide
```

### 2️⃣ Install Dependencies
Install both backend and frontend dependencies:
```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3️⃣ Start the Servers
Run both frontend and backend:
```bash
# In backend/
npm start

# In frontend/
npm start
```
By default,  
Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:5000`

---

## 🔐 Authentication Flow
- **Signup:** Users register with their name, email, and password (stored securely in MongoDB).  
- **Login:** Validates credentials through backend API.  
- **After Login:** Displays the user’s name in the navbar top-right corner.  

---

## 🌐 Suggested Trips (Web Scraping)
The app fetches suggested destinations by **scraping travel websites** and showing summarized information.  
Data includes:
- Place name  
- Description / highlights  
- Best time to visit  

This gives users real travel ideas without depending on paid APIs.

---

## 🧭 Offline Itinerary Builder
Since OpenAI’s API is paid, the itinerary builder uses **offline logic**:
- It suggests a structured, human-like itinerary based on user inputs.
- Example:
  - Day 1: Local sightseeing
  - Day 2: Adventure activities
  - Day 3: Cultural exploration

---

## 🧱 Future Enhancements
- Integrate **OpenAI API** or **Gemini AI** for dynamic trip planning.  
- Add **weather forecasting** via OpenWeatherMap API.  
- Build **user dashboards** for saved itineraries.  
- Enable **streaming AI responses** for real-time planning interaction.  

---

## 🎥 Deliverables
- Fully working **MERN web app** (frontend + backend)  
- GitHub repository with clear structure and README  
- Optional short **demo video (2–3 minutes)** explaining app features  

---

## 👨‍💻 Author
**Ch .Ratnamala Reddy**  
B.E. CSE, Chaitanya Bharathi Institute of Technology (CBIT)  
📧 [ratna.ivnaco@gmail.com]  
🌐 [https://www.linkedin.com/in/ratnamala-reddy-477b962aa/]  

---

## 🪪 License
This project is licensed under the **MIT License**.  
You can freely modify and distribute it with proper credit.

---

⭐ **If you like this project, please give it a star on GitHub!**# AI--Travel-guide
