const express = require("express");
const router = express.Router();

const blacklistedTokens = [];

router.get("/logout", (req, res) => {
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(400).json({ message: "Token not provided." });
  }

  try {
    if (blacklistedTokens.includes(token)) {
      return res
        .status(401)
        .json({ message: "Token has already being blacklisted." });
    }
    blacklistedTokens.push(token);
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Error during logout", error);
    return res.status(500).json({ message: "An error occured during logout." });
  }
});

module.exports = router;
