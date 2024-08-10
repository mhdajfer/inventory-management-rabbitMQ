const express = require("express");
const ProductController = require("../Controllers/ProductController");
const router = express.Router();

router.get("/", (req, res) => ProductController.getProducts(req, res));

router.post("/new", (req, res) => ProductController.createProduct(req, res));

module.exports = router;
