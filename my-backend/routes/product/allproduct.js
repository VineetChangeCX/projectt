const expres = require("express");
const router = expres.Router();
const Product = require("../../models/products");

router.get("/allproduct", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      products,
    });
  } catch (error) {
    console.error("Error occured while fetching products", error);
    res.status(500).json({ message: "Error occured while fetching products" });
  }
});

module.exports = router;
