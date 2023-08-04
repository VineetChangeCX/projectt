const express = require("express");
const router = express.Router();

const Users = require("../../models/user");

router.patch("/deleteuser", async (req, res) => {
  const userID = req.body.userID;
  try {
    const isUser = Users.findById(userID);
    if (!isUser) {
      return res.status(404).json({ message: "User not found." });
    }
    isUser.isDeleted = true;
    await isUser.save();

    res.json({ message: ":User deleted successfully." });
  } catch (error) {
    console.log("Error occured while deleting user:", error);
    res.status(500).json({ message: "Error occured while deleting user." });
  }
});
module.exports = router;
