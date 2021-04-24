var express = require('express');
const AdminController = require('../controllers/admin.controller');
const isAuth = require('../middlewares/is-auth');
const uploadFile = require('../middlewares/uploadFileMulter');

var router = express.Router();





// /api/admin/add-product
router.put('/products/:productId', isAuth, uploadFile.single("images"), AdminController.putEditProduct);
router.delete('/products/:productId', isAuth, AdminController.deleteProduct);
router.get('/products/:productId',  AdminController.getProduct);
router.post('/products', isAuth, uploadFile.single("images"), AdminController.postAddProduct);
router.get('/products', isAuth , AdminController.fetchAllProducts);
router.get('/orders', isAuth , AdminController.fetchAllOrders);


router.put('/categories/:categoryId', isAuth, AdminController.putEditCategory);
router.delete('/categories/:categoryId', isAuth, AdminController.deleteCategory);
// router.get('/products/:categoryId', AdminController);
router.post('/categories', isAuth, AdminController.postAddCategory);
router.get('/categories', isAuth, AdminController.fetchAllCategories);


module.exports = router;
