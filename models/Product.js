const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },

  images: [
    {
      url: { type: String, required: true },
      altText: { type: String },
    },
  ],

  from: String,

  // ratings: {
  //   averageRating: { type: Number, min: 0, max: 5, default: 0 },
  //   reviewCount: { type: Number, default: 0 },
  // },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
