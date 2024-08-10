const express = require("express");
const OrderController = require("../Controllers/OrderController");
const router = express.Router();

router.get("/", (req, res) => OrderController.getOrders(req, res));

router.post("/new", (req, res) => OrderController.createOrder(req, res));

module.exports = router;
