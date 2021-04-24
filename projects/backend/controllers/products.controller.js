const Product = require('../models/product.model');

exports.fetchProductsByCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  Product.find({ categories: categoryId })
        .then(products => {
          res.status(200).json({
            success: true,
            products
          });
        })
        .catch(error => {
          res.status(500).json({
            success: false,
            error });
        })
}

exports.fetchAllProducts = (req, res, next) => {
  Product.find()
        .then(products => {
          res.status(200).json({
            success: true,
            products
          });
        })
        .catch(error => {
          res.status(500).json({
            success: false,
            error });
        })
}

exports.getProductById = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
        .then(product => {
          res.status(200).json({
            success: true,
            product
          });
        })
        .catch(error => {
          res.status(500).json({
            success: false,
            error });
        })
}
