const ProductModel = require("../models/Product");
const publishMessage = require("../config/RabbitMQ");

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (!products)
      return res.status(200).json({ message: "No products available" });

    return res.status(200).json({ products, message: "Products available" });
  } catch (error) {
    console.log(`server error while retrieving products: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price)
      return res.status(400).json({ message: "Invalid parameters" });

    const newProduct = new ProductModel({
      name,
      description,
      price,
    });

    await newProduct.save();

    return res
      .status(201)
      .json({ newProduct, message: "Product saved successfully" });
  } catch (error) {
    console.log(`server error while creating product: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

const buyProduct = async (req, res) => {
  try {
    const { ids } = req.body;

    const products = await ProductModel.find({ _id: { $in: ids } });

    console.log("ordered products: ", products);

    await publishMessage(JSON.stringify(products), "order_products");

    return res.status(201).json({ message: "order created successfully" });
  } catch (error) {
    console.log(`server error while buying product: ${error.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  buyProduct,
};
