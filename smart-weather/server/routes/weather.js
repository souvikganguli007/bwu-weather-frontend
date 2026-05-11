const express = require("express");
const router = express.Router();
const axios = require("axios");
const Weather = require("../models/weather");

// GET all weather history
router.get("/history/all", async (req, res) => {
  try {
    const history = await Weather.find().sort({ date: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
});

// GET single weather record by ID
router.get("/history/:id", async (req, res) => {
  try {
    const record = await Weather.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching record" });
  }
});

// DELETE single weather record by ID
router.delete("/history/:id", async (req, res) => {
  try {
    const deleted = await Weather.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Weather record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record" });
  }
});

// ✅ Health Alert Route — AQI + Outside Score (Free API only)
router.get("/health/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_KEY;

    // Step 1: Get coordinates
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    if (!geoRes.data.length) return res.status(404).json({ message: "City not found" });
    const { lat, lon } = geoRes.data[0];

    // Step 2: Get Air Quality (free)
    const aqiRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const aqi = aqiRes.data.list[0].main.aqi;
    const components = aqiRes.data.list[0].components;

    // Step 3: Calculate score (no UV needed)
    let score = 100;
    if (aqi >= 4) score -= 40;
    else if (aqi === 3) score -= 20;
    else if (aqi === 2) score -= 10;
    score = Math.max(0, score);

    const aqiLabels = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];
    const aqiColors = ["", "#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97"];

    res.json({
      city, lat, lon, aqi,
      aqiLabel: aqiLabels[aqi],
      aqiColor: aqiColors[aqi],
      uv: "N/A",
      pm25: Math.round(components.pm2_5),
      pm10: Math.round(components.pm10),
      co: Math.round(components.co),
      outsideScore: score,
      recommendation:
        score >= 80 ? "Great day to go outside! 🌟" :
        score >= 60 ? "Okay to go out, take care ⚠️" :
        score >= 40 ? "Limit time outside today 😷" :
        "Stay indoors if possible! 🏠"
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Health data fetch failed" });
  }
});

// GET weather by city
router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_KEY;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = response.data;
    const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      condition: data.weather[0].main,
    };
    const savedWeather = await Weather.create(weatherData);
    res.json(savedWeather);
  } catch (error) {
    res.status(500).json({ message: "City not found or API error" });
  }
});

module.exports = router;