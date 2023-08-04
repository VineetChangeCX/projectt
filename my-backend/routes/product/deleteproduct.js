const express = require("express");
const router = express.Router();
const Product = require("../../models/products");

router.delete("/:id", async (req, res) => {
  const productID = req.params.id;
  try {
    const isProduct = await Product.findById(productID);
    if (!isProduct) {
      return res
        .status(404)
        .json({ message: "Product not found in database." });
    }
    await Product.findByIdAndRemove(productID);
    res.json({ message: "Product deleted successfully from inventory." });
  } catch (error) {
    console.error("Error occured while deleting a product:", error);
    res.status(500).json("Error occured while deleting a product.");
  }
});
module.exports = router;
