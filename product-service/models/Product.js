const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  created_at: {
    required: true,
    type: Date,
    default: Date.now(),
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
