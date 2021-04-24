const Category = require('../models/category.model');


exports.fetchAllCategories = (req, res, next) => {
  Category.find()
        .then(categories => {
          res.status(200).json({
            success: true,
            categories
          });
        })
        .catch(error => {
          res.status(500).json({
            success: false,
            error });
        })
}

exports.getCategoryById = (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.findById(categoryId)
        .then(category => {
          res.status(200).json({
            success: true,
            category
          });
        })
        .catch(error => {
          res.status(500).json({
            success: false,
            error });
        })
}
