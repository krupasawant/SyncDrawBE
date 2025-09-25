require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { requireAuth } = require("@clerk/express");
const designRoutes = require("./routes/design");

const app = express();
app.use(cors());
app.use(express.json());

// --- Connect to MongoDB ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connected"));

// --- API routes ---
app.use("/api/designs", requireAuth(), designRoutes);

// --- Test route ---
app.get("/", (req, res) => res.send("Backend running"));

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
