const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json({ products });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Products listing gone wrong, try again...",
      error: err.message,
    });
  }
};

module.exports = {
  getAllProducts,
};
