const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  products: [
    {
      product_id: String,
    },
  ],
  total_price: Number,
  created_at: {
    required: true,
    type: Date,
    default: Date.now(),
  },
});

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;
