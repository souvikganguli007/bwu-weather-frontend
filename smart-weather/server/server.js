require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ FIX 1: Import cors

const app = express();

// ✅ Middleware
app.use(cors({
  origin:'*',
  methods:['GET','POST','DELETE','PUT'],
  credentials:false
})); // ✅ FIX 1: Enable CORS for all origins (fixes browser blocking)
app.use(express.json());

// ✅ Home Route (Test)
app.get("/", (req, res) => {
  res.send("✅ Smart Weather API Running Successfully");
});

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Import Routes
const authRoutes = require("./routes/auth");
const weatherRoutes = require("./routes/weather");

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);

// optional (for /weather also work)
app.use("/weather", weatherRoutes);

// ✅ Start Server
app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
