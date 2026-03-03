const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
require("./models/User");
require('./models/relation');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const pengajuanRoutes = require("./routes/pengajuan");
const uploadRoutes = require("./routes/upload");
const modulLayananRoutes = require("./routes/modulLayanan");
const notifikasiRoutes = require("./routes/notifikasiRoutes");
const profileRoutes = require("./routes/profile");
const logProsesRoutes = require('./routes/logProses');

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pengajuan", pengajuanRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/modul-layanan", modulLayananRoutes);
app.use("/api/notifikasi", notifikasiRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api/proses', logProsesRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    const isDevelopment = process.env.NODE_ENV !== 'production';

    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log("Database & tables have been synced.");
    console.log("ℹUntuk update schema, jalankan: npx sequelize-cli db:migrate");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;

