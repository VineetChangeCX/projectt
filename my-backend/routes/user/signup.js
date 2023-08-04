const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Users = require("../../models/user");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "Email id already exist." });
    }

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = new Users({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Account created successfully." });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Error during signup." });
  }
});
module.exports = router;
