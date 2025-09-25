const mongoose = require("mongoose");

const DesignSchema = new mongoose.Schema({
  userId: { type: String, required: true },               // owner
  collaborators: { type: [String], default: [] },         // additional users
  title: { type: String, default: "Untitled Design" },
  data: mongoose.Schema.Types.Mixed,                     
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Design", DesignSchema);
