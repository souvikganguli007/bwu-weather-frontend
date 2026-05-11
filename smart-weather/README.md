cd smart-weather/server
npm install


# 🌦️ Smart Weather Web Application

## 📌 Project Description

Smart Weather is a full-stack web application that allows users to check real-time weather information for any city. The application fetches live weather data from an external API, stores search history in a MongoDB database, and provides a clean and interactive user interface.

This project demonstrates complete integration of **frontend, backend, API handling, and database management**.

---

## 🚀 Key Features

* 🔍 Search weather by city name
* 🌡️ Display temperature, humidity, wind speed, and condition
* 💾 Automatically save weather history in MongoDB
* 📜 View complete weather history
* 🗑️ Delete individual weather records
* 👤 User Registration & Login system
* 📊 Chart visualization (temperature graph)
* 🎨 Responsive and modern UI design

---

## 🛠️ Technologies Used

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* Axios
* bcryptjs
* dotenv
* cors

### Frontend:

* HTML5
* CSS3 / Tailwind CSS
* JavaScript
* Chart.js

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/smart-weather.git
cd smart-weather
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
WEATHER_KEY=your_openweather_api_key
JWT_SECRET=your_secret_key
```

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install -g serve
```

---

## ▶️ How to Run the Project

### Run Backend

```bash
cd server
node server.js
```

Backend will run on:

```
http://localhost:5000
```

---

### Run Frontend

```bash
cd frontend
serve .
```

Open in browser:

```
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| GET    | `/api/weather/:city`       | Get weather & save to DB |
| GET    | `/api/weather/history/all` | Get all weather history  |
| GET    | `/api/weather/history/:id` | Get single record        |
| DELETE | `/api/weather/history/:id` | Delete record            |
| POST   | `/api/auth/register`       | Register user            |
| POST   | `/api/auth/login`          | Login user               |

---

## 📊 Sample Output

### Weather API Response

```json
{
  "city": "Kolkata",
  "temperature": 33.5,
  "humidity": 25,
  "wind": 2.5,
  "condition": "Clouds"
}
```

---

### Weather History Output

```json
[
  {
    "_id": "699c290ea1c69345c9331203",
    "city": "Kolkata",
    "temperature": 33.58
  }
]
```

---

## 🔄 Project Workflow

1. User enters a city name
2. Frontend sends request to backend
3. Backend fetches data from OpenWeather API
4. Data is saved in MongoDB
5. Response is sent back to frontend
6. UI displays weather data and updates history

---

## ⚠️ Common Issues & Fixes

* ❌ Server not starting → Run `npm install`
* ❌ API not working → Check `.env` file
* ❌ CORS error → Ensure `cors()` middleware is used
* ❌ Invalid ID → Use correct `_id` from database

---

## 🚀 Future Enhancements

* 7-day weather forecast
* JWT authentication & authorization
* Animated weather icons
* Auto location detection
* Deployment (Render / Vercel / Netlify)

---
