const express = require("express");
const router = express.Router();

const Users = require("../../models/user");
const Product = require("../../models/products");

router.patch("/addcart", async (req, res) => {
  const { product, quantity } = req.body;
  const userID = req.user;
  try {
    const isUser = await Users.findById(userID);
    if (!isUser) {
      return res.status(404).json({ message: "User not Found." });
    }
    isUser.cart.push({ ...req.body });
    await isUser.save();

    res.status(200).json({ message: "Item added successfully in cart" });
  } catch (error) {
    console.error("Error while adding product to cart:", error);
    res.status(500).json({ message: "Error while adding product to cart." });
  }
});

module.exports = router;
