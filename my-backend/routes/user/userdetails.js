const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

router.get("/userdetails", async (req, res) => {
  try {
    const userID = req.user;
    const isUser = await User.findById(userID).select("-password");
    if (!isUser) {
      return res.json("User not available.");
    }
    res.json(isUser);
  } catch (error) {
    console.error("Error occurred while fetching details of user:", error);
    res.status(500).json("Error occurred while fetching details of user.");
  }
});

module.exports = router;
