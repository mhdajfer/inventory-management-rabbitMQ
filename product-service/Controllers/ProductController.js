const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (!products)
      return res.status(200).json({ message: "No products available" });

    return res.status(200).json({ products, message: "Products available" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(`server error while retrieving products: ${error.message}`);
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
    res.status(500).json({ message: "Server error" });
    console.log(`server error while creating product: ${error.message}`);
  }
};


module.exports = {
    getProducts,
    createProduct
}