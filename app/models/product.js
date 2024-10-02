const mongoose = require("mongoose");

// Assuming Category, Brand, and User models exist
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  message: { type: String, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  volume: { type: String },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  images: [{ type: String }],
  stock: { type: Number, default: 0 }, // Change to Number with a default value of 0
  detail: { type: String },
  reviews: [reviewSchema], // Embed reviews
  nutritions: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: "Category", required: false },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
