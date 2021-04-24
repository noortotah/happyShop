var express = require('express');
const UserController = require('../controllers/users.controller');


var router = express.Router();



router.post('/addToShoppingCart', UserController.addToShoppingCart);
router.get('/getCart', UserController.getShoppingCart);
router.post('/removeFromShoppingCart', UserController.removeFormShoppingCart);

router.post('/addToWishlist', UserController.addToWishlist);
router.get('/getWishlist', UserController.getWishlist);
router.post('/removeFromWishlist', UserController.removeFormWishlist);

router.post('/addOrder', UserController.addOrder);



module.exports = router;
