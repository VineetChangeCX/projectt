const express = require("express");
const router = express.Router();
const Order = require("../../models/order");

router.get("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orderDetail = await Order.findById(orderId);

    if (!orderDetail) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json(orderDetail);
  } catch (error) {
    console.error("Order details not found using ID:", error);
    res.status(500).json({ message: "Order deatils not found using ID." });
  }
});
module.exports = router;
