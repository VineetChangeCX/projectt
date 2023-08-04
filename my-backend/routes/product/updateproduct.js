const express = require("express");
const router = express.Router();
const Product = require("../../models/products");

router.patch("/:id", async (req, res) => {
  const productID = req.params.id;
  try {
    const isProduct = await Product.findById(productID);
    if (!isProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    await Product.findByIdAndUpdate(productID, req.body);
    res.json({ message: "Product details updated successfully." });
  } catch (error) {
    console.error("Error occured while updating product details:", error);
    res.status(500).json("Error occured while updating product details.");
  }
});
module.exports = router;
