const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Order = require("../../models/order");
const Product = require("../../models/products");

router.post("/addorder", async (req, res) => {
  const { orderItems } = req.body;
  const userID = req.user;
  try {
    const customer = await User.findById(userID);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    const orders = [];
    for (const cartItem of orderItems) {
      const product = await Product.findById(cartItem.product);
      if (product) {
        const orderItem = { ...product };

        orders.push(orderItem);
      } else {
        console.log(`Product with ID ${cartItem.product} not found.`);
      }
    }

    const newOrder = new Order({
      customer: userID,
      orderItems: orders,
      paymentStatus: "Unpaid",
      orderDate: new Date(),
    });

    await newOrder.save();
    customer.cart = [];
    await customer.save();
    res.json({ message: "Order placed successfully." });
  } catch (error) {
    console.error("Error while placing order:", error);
    res.status(500).json({ message: "Error while placing order.", error });
  }
});

module.exports = router;
