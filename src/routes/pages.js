// src/routes/pages.js
const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const { isValidUrl } = require("../middleware/validate");
const { generateCode } = require("../utils/codeGen");

// Dashboard - list + create form
router.get("/", async (req, res) => {
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
    res.render("dashboard", {
      links,
      query: q || "",
      error: null,
      success: null
    });
  } catch (err) {
    console.error("Error rendering dashboard:", err);
    res.status(500).send("Internal server error");
  }
});

// Handle create link from dashboard form
router.post("/create", async (req, res) => {
  try {
    let { targetUrl, code } = req.body;

    if (!targetUrl || !isValidUrl(targetUrl)) {
      const links = await Link.find().sort({ createdAt: -1 });
      return res.status(400).render("dashboard", {
        links,
        query: "",
        error: "Invalid URL",
        success: null
      });
    }

    if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
      const links = await Link.find().sort({ createdAt: -1 });
      return res.status(400).render("dashboard", {
        links,
        query: "",
        error: "Code must match [A-Za-z0-9]{6,8}",
        success: null
      });
    }

    if (!code) {
      code = generateCode(6);
    }

    const existing = await Link.findOne({ code });
    if (existing) {
      const links = await Link.find().sort({ createdAt: -1 });
      return res.status(409).render("dashboard", {
        links,
        query: "",
        error: "Code already exists. Try another.",
        success: null
      });
    }

    await Link.create({ code, targetUrl });

    const links = await Link.find().sort({ createdAt: -1 });
    return res.render("dashboard", {
      links,
      query: "",
      error: null,
      success: `Link created: ${code}`
    });
  } catch (err) {
    console.error("Error creating link (page):", err);
    res.status(500).send("Internal server error");
  }
});

// Delete via dashboard
router.post("/delete/:code", async (req, res) => {
  try {
    const { code } = req.params;
    await Link.findOneAndDelete({ code });
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting link (page):", err);
    res.status(500).send("Internal server error");
  }
});

// Stats page /code/:code
router.get("/code/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).render("stats", { link: null, notFound: true });
    }

    res.render("stats", { link, notFound: false });
  } catch (err) {
    console.error("Error rendering stats:", err);
    res.status(500).send("Internal server error");
  }
});

// Redirect /:code
router.get("/:code", async (req, res, next) => {
  const { code } = req.params;

  try {
    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).send("Link not found");
    }

    link.totalClicks += 1;
    link.lastClicked = new Date();
    await link.save();

    return res.redirect(302, link.targetUrl);
  } catch (err) {
    console.error("Error redirecting:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
