require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { requireAuth } = require("@clerk/express");
const designRoutes = require("./routes/design");

const app = express();

// --- CORS setup: playful & flexible ---
app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman, curl, etc. (no origin)
      if (!origin) return callback(null, true);

      // whitelist your environments dynamically
      const whitelist = [
        process.env.FRONTEND_URL, // e.g., your Vercel URL
        "http://localhost:5173"
      ];

      if (whitelist.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error(`CORS blocked for origin: ${origin}`), false);
      }
    },
    credentials: true, // necessary for Clerk auth headers
  })
);

app.use(express.json());

// --- MongoDB ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connected"));

// --- Routes ---
app.use("/api/designs", requireAuth(), designRoutes);
app.get("/", (req, res) => res.send("Backend running"));

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
