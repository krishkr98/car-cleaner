require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", process.env.CLIENT_URL],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cars", require("./routes/cars"));
app.use("/api/subscriptions", require("./routes/subscriptions"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/notifications", require("./routes/notifications"));

// Health check
app.get("/api/health", (_, res) =>
  res.json({ status: "ok", time: new Date() })
);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));