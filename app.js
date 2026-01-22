const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Load semua model dan relasi
require("./models/User");
const { Pengajuan, ModulLayanan, Dokumen, PersyaratanDokumen } = require("./models/relation");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving untuk uploaded documents
app.use("/uploads", express.static("uploads"));

// Routes
const userRoutes = require("./routes/users");
const pengajuanRoutes = require("./routes/pengajuan");
const uploadRoutes = require("./routes/upload");
const modulLayananRoutes = require("./routes/modulLayanan");

app.use("/api/users", userRoutes);
app.use("/api/pengajuan", pengajuanRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/modul-layanan", modulLayananRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connection has been established successfully.");

    // Sync database & tables
    // force: false = tidak drop table yang sudah ada
    // alter: true = update struktur table sesuai model (hati-hati di production!)
    return sequelize.sync({ force: false, alter: true });
  })
  .then(() => {
    console.log("✅ Database & tables have been synced.");
   
  })
  
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

module.exports = app;

