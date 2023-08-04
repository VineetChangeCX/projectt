const express = require("express");
const router = express.Router();
const Products = require("../../models/products");

router.get("/:id", async (req, res) => {
  const productID = req.params.id;
  try {
    const product = await Products.findById(productID);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    console.error("Error occurred while fetching product by ID.", error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching product by ID." });
  }
});

module.exports = router;
