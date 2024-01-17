const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  items: {
    type: [orderItemSchema],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
