const express = require("express");
const ProductModel = require("../models/Product");
const ProductController = require("../Controllers/ProductController");
const router = express.Router();

router.get("/", ProductController.getProducts);

router.post("/new", ProductController.createProduct);

module.exports = router;
