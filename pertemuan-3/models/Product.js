const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
  brand: {
    type: String,
    required: [true, "Please add a brand"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
  },
  image: {
    type: String,
    required: [true, "Please add a image"],
  },
});

module.exports = mongoose.model("Product", productSchema);
