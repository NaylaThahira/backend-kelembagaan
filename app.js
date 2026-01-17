const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// load semua model
require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connection has been established successfully.");

    // Sync database & tables
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Database & tables have been synced.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

module.exports = app;
