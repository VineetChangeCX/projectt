const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Users = require("../../models/user");

router.delete("/:id", async (req, res) => {
  const productID = new mongoose.Types.ObjectId(req.params.id); // Use new to create an instance of ObjectId
  const userID = req.user;

  if (!userID) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User not logged in." });
  }

  try {
    const isUser = await Users.findById(userID);
    if (!isUser) {
      return res.status(404).json({ message: "User not Found." });
    }

    isUser.cart = isUser.cart.filter(
      (item) => item.product.toString() !== productID.toString() // Use toString() to compare ObjectId values
    );
    await isUser.save();

    res.status(200).json({
      cart: isUser.cart,
      message: "Item removed successfully from cart",
    });
  } catch (error) {
    console.error("Error while removing product from cart:", error);
    res
      .status(500)
      .json({ message: "Error while removing product from cart." });
  }
});

module.exports = router;
