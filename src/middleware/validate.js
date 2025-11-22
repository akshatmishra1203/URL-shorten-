// src/middleware/validate.js

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function validateCreateLink(req, res, next) {
  const { targetUrl, code } = req.body;

  if (!targetUrl || !isValidUrl(targetUrl)) {
    return res.status(400).json({ error: "Invalid or missing targetUrl" });
  }

  if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
    return res.status(400).json({
      error: "Code must match [A-Za-z0-9]{6,8}"
    });
  }

  next();
}

module.exports = { validateCreateLink, isValidUrl };
