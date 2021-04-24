const User = require("../models/user.model");
const Order = require("../models/order.model");

/**
 * Shopping Cart
 */
exports.addToShoppingCart = (req, res, next) => {
  const cartItem = {
    productId: req.body.productId,
    selectedVariation: req.body.selectedVariation,
  };

  req.user
    .addToCart(cartItem)
    .then((itemId) => {
     res.status(201).json({
        success: true,
        itemId,
      });
    })
    .catch((error) => {
      res.status(500).json({ success: false });
    });
};

exports.getShoppingCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const items = [];
      user.cart.items.forEach((element, index) => {
        items.push({
          _id: element._id,
          product: element.productId,
          selectedVariation: element.selectedVariation,
        });
      });

      res.status(200).json({
        success: true,
        items: items,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
      });
    });
};
exports.removeFormShoppingCart = (req, res, next) => {
  req.user
    .removeShoppingCartItem(req.body.itemId)
    .then((result) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
};

/**
 * WishList
 */
exports.addToWishlist = (req, res, next) => {
  const cardItem = {
    productId: req.body.productId,
    selectedVariation: req.body.selectedVariation,
  };
  req.user
    .addToWishlist({ ...cardItem })
    .then((itemId) => {
      res.status(201).json({
        success: true,
        itemId,
      });
    })
    .catch((error) => {
      res.status(500).json({ success: false });
    });
};
exports.getWishlist = (req, res, next) => {
  req.user
    .populate("wishlist.items.productId")
    .execPopulate()
    .then((user) => {
      const items = [];
      user.wishlist.items.forEach((element, index) => {
        items.push({
          _id: element._id,
          product: element.productId,
          selectedVariation: element.selectedVariation,
        });
      });

      res.status(200).json({
        success: true,
        items: items,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
      });
    });
};

exports.removeFormWishlist = (req, res, next) => {
  req.user
    .removeWishlistItem(req.body.itemId)
    .then((result) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
};

/**
 * Orders
 */
exports.addOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const items = [];
      user.cart.items.forEach((element, index) => {
        items.push({
          _id: element._id,
          product: element.productId,
          selectedVariation: element.selectedVariation,
        });
      });

      const order = new Order({
        items: items,
        user: {
          name: req.user.first_name + " " + req.user.last_name,
          userId: req.user._id,
        },
      });

      return order.save();
    })
    .then((order) => {
      req.user.cart = { items: [] };
      req.user.orders.push(order._id);
      return req.user.save();
    })
    .then((user) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};



