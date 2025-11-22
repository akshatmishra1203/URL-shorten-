// src/server.js
require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./db");

const apiRoutes = require("./routes/api");
const pageRoutes = require("./routes/pages");

const app = express();

// Config
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const APP_VERSION = process.env.APP_VERSION || "1.0";
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// DB
connectDB(MONGODB_URI);

// Make baseUrl available in all views
app.locals.baseUrl = BASE_URL;
app.locals.appVersion = APP_VERSION;

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // for HTML forms
app.use(express.json()); // for JSON APIs

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));

// View engine
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

// Routes
app.use("/api", apiRoutes);
app.use("/", pageRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TinyLink running at http://localhost:${PORT}`);
});
