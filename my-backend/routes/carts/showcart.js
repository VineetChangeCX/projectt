const express = require("express");
const router = express.Router();

const User = require("../../models/user");

router.get("/showcart", async (req, res) => {
  const userID = req.user;
  try {
    const isUser = await User.findById(userID);
    if (!isUser) {
      return res.status(404).json({ message: "User not Found." });
    }
    return res.json(isUser.cart);
  } catch (error) {
    console.error("Error occured while showing cart Items:", error);
    res.status(500).json({ message: "Error occurred while showing cart." });
  }
});
module.exports = router;
