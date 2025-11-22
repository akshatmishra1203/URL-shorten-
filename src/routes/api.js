// src/routes/api.js
const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const { validateCreateLink } = require("../middleware/validate");
const { generateCode } = require("../utils/codeGen");

// POST /api/links - create short link
router.post("/links", validateCreateLink, async (req, res) => {
  try {
    let { targetUrl, code } = req.body;

    if (!code) {
      code = generateCode(6);
    }

    const existing = await Link.findOne({ code });
    if (existing) {
      return res.status(409).json({ error: "Code already exists" });
    }

    const link = await Link.create({ code, targetUrl });

    return res.status(201).json({
      code: link.code,
      targetUrl: link.targetUrl,
      totalClicks: link.totalClicks,
      lastClicked: link.lastClicked
    });
  } catch (err) {
    console.error("Error creating link:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/links - list all links (optional search ?q=)
router.get("/links", async (req, res) => {
  try {
    const { q } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { code: new RegExp(q, "i") },
        { targetUrl: new RegExp(q, "i") }
      ];
    }

    const links = await Link.find(filter).sort({ createdAt: -1 });
    res.json(
      links.map((l) => ({
        code: l.code,
        targetUrl: l.targetUrl,
        totalClicks: l.totalClicks,
        lastClicked: l.lastClicked
      }))
    );
  } catch (err) {
    console.error("Error listing links:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/links/:code - stats for one link
router.get("/links/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.json({
      code: link.code,
      targetUrl: link.targetUrl,
      totalClicks: link.totalClicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    });
  } catch (err) {
    console.error("Error getting link:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/links/:code - delete link
router.delete("/links/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const deleted = await Link.findOneAndDelete({ code });

    if (!deleted) {
      return res.status(404).json({ error: "Link not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting link:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
