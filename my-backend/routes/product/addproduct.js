const express = require("express");
const router = express.Router();
const Product = require("../../models/products");

router.post("/addproduct", async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    brand,
    imageURL,
    variants,
    quantity,
    inventory,
  } = req.body;

  try {
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      brand,
      imageURL,
      variants,
      quantity,
      inventory,
    });

    await newProduct.save();
    res.json({
      message: "new Product added successfully.",
      products: newProduct,
    });
  } catch (error) {
    console.error("Error occured while adding product.", error);
    res.status(500).json({ message: "Error occured while adding product." });
  }
});

module.exports = router;
