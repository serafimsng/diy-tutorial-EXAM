const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect DB
connectDB();

// Routes
app.use("/products", productRoutes);
app.use("/", authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log("🚀 Server running on port", PORT)
);
