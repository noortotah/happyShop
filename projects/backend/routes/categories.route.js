var express = require('express');
const CategoriesController = require('../controllers/categories.controller');


var router = express.Router();

router.get('/', CategoriesController.fetchAllCategories);


module.exports = router;
