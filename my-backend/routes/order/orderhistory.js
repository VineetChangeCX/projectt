const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Order = require("../../models/order");

router.get("/orderhistory", async (req, res) => {
  const customerID = req.user;
  try {
    const customer = await Order.find({ customer: customerID });
    if (!customer) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(customer);
  } catch (error) {
    console.error("User history not found by ID:", error);
    return res.status(500).json({ message: "User history not found by ID" });
  }
});

module.exports = router;
