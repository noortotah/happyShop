var express = require('express');
const ProductController = require('../controllers/products.controller');


var router = express.Router();

router.get('/', ProductController.fetchAllProducts);
router.get('/:productId', ProductController.getProductById);
router.get('/fetchProductsByCategory/:categoryId', ProductController.fetchProductsByCategory);


module.exports = router;
