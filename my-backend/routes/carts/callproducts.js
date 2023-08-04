const express = require("express");
const router = express.Router();
const Products = require("../../models/products");

router.get("/multiple", async (req, res) => {
  const { ids } = req.query;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: "Invalid product IDs." });
  }
  try {
    const products = await Products.find({ _id: { $in: ids } });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Products not found." });
    }
    res.json(products);
  } catch (error) {
    console.error("Error occurred while fetching products by IDs.", error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching products by IDs." });
  }
});

module.exports = router;
