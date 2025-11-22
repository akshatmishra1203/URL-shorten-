// src/models/Link.js
const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Za-z0-9]{6,8}$/,
      index: true
    },
    targetUrl: {
      type: String,
      required: true
    },
    totalClicks: {
      type: Number,
      default: 0
    },
    lastClicked: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Link", linkSchema);
