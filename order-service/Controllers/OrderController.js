const OrderModel = require("../models/Order");

const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    if (!orders) return res.status(400).json({ message: "No orders found" });

    return res.status(200).json({ orders, message: "Orders found" });
  } catch (error) {
    console.log(`Error while getting orders : ${error}`);
    return res.status(500).json({ message: "Error while getting orders" });
  }
};

const createOrder = async (products) => {
  try {
    const total_price = products.reduce(
      (acc, product) => acc + product.price,
      0
    );

    if (!products || !total_price)
      return res.status(500).json({ message: "Invalid Parameters" });

    const newOrder = new OrderModel({
      products,
      total_price,
    });

    await newOrder.save();
    console.log("Order added to DB", newOrder);
  } catch (error) {
    console.log(`Error while creating orders : ${error}`);
    return res.status(500).json({ message: "Error while creating orders" });
  }
};

module.exports = {
  getOrders,
  createOrder,
};
