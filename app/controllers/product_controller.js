const Product = require("../models/product");

// Create a new product with image uploads
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      quantity,
      volume,
      price,
      stock,
      detail,
      category,
      brand,
      nutritions,
    } = req.body;

    // Retrieve uploaded files
    const thumbnailUrl = req.files["thumbnail"]
      ? req.files["thumbnail"][0].path
      : "";
    const imagesUrls = req.files["images"]
      ? req.files["images"].map((file) => file.path)
      : [];

    const product = new Product({
      name,
      quantity,
      volume,
      price,
      thumbnail: thumbnailUrl,
      images: imagesUrls,
      stock,
      detail,
      nutritions,
      category,
      brand,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};
// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name") // Populate Category by name
      .populate("brand", "name") // Populate Brand by name
      .populate("reviews.user", "name"); // Populate Review's User by name
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing product with image uploads
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      quantity,
      volume,
      price,
      stock,
      detail,
      category,
      brand,
      nutritions,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the fields if they exist
    product.name = name || product.name;
    product.quantity = quantity || product.quantity;
    product.volume = volume || product.volume;
    product.price = price || product.price;
    product.stock = stock !== undefined ? stock : product.stock;
    product.detail = detail || product.detail;
    product.nutritions = nutritions || product.nutritions;
    product.category = category || product.category;
    product.brand = brand || product.brand;

    // Handle uploaded images
    if (req.files["thumbnail"]) {
      product.thumbnail = req.files["thumbnail"][0].path;
    }

    if (req.files["images"]) {
      const imagesUrls = req.files["images"].map((file) => file.path);
      product.images = imagesUrls.length > 0 ? imagesUrls : product.images;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("brand", "name")
      .populate("reviews.user", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a review
exports.addReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const { user, rating, message } = req.body;

    // Add logic for adding a review to the product with the productId
    // (Assume you are updating the product document with a new review)

    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error adding review" });
  }
};
