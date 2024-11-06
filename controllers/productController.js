const Product = require("../models/Product.js");
const cloudinary = require("../config/cloudinary.js");

const getProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const allProducts = await Product.find();

    // Ensure the products data is structured properly
    const Products = allProducts.map((product) => ({
      _id: product._id.toString(), // Convert ObjectId to string
      name: product.name,
      description: product.description,
      price: product.price,
      from: product.from,
      category: product.category,
      imageUrl: product.images.length > 0 ? product.images[0].url : null, // First image URL
      imageAltText:
        product.images.length > 0 ? product.images[0].altText : null, // First image alt text
    }));


    // Respond with the products data
    res.status(200).json({
      success: true,
      data: Products, // Send the formatted data to the frontend
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: err.message,
    });
  }
};

const getProductByID = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const postProduct = async (req, res) => {
  try {
    const { name, category, from, description, price } = req.body;
    let imageUrl = null;

    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto",
      });
      imageUrl = result.secure_url; // Get the URL of the uploaded image
    }

    console.log(imageUrl);

    // Create a new product instance
    const newProduct = new Product({
      name,
      category,
      description,
      price,
      from,
      images: {
        url: imageUrl,
        altText: name,
      },
    });

    // Save the product to the database
    await newProduct.save();
    console.log(newProduct);

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: "Failed to create product",
      details: error.message,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Get the product ID from URL parameters
    const updates = req.body; // Get the updated data from the request body

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure updates match the schema
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Get the product ID from URL parameters

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductByID,
  postProduct,
  editProduct,
  deleteProduct,
};
