const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Order = require("../models/order.model");

exports.fetchAllProducts = (req, res, next) => {
  Product.find()
    // .populate('categories')
    // .exec()
    .then((products) => {
      res.status(200).json({
        success: true,
        products,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findOne({_id: productId})
    // .populate('categories')
    // .exec()
    .then((product) => {
      res.status(200).json({
        success: true,
        product,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });

}
exports.postAddProduct = (req, res, next) => {
  console.log('postAddProduct');
  console.log('req.body', req.body.title);
  console.log('req.file', req.file);

  const productObj = {
    user_id: req.user._id,
    sku: req.body.sku,
    title: req.body.title,
    description: req.body.description,
    images: {
      main:  req.file.path,
      catalog: [],
    },
    manufacture_details: JSON.parse(req.body.manufacture_details),
    shipping_details: JSON.parse(req.body.shipping_details),
    quantity: req.body.quantity,
    pricing: JSON.parse(req.body.pricing),
    variations: JSON.parse(req.body.variations),
    variation_quantity: [],
    categories: JSON.parse(req.body.categories),
    outofStock: JSON.parse(req.body.outofStock),
  };

  console.log('productObj', productObj);

  const product = new Product(productObj);
  console.log('product', product);
  product
    .save()
    .then((product) => {
      console.log('insuccess', product);
      res.status(201).json({
        success: true,
        productId: product._id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
};

exports.putEditProduct = (req, res, next) => {
  const productObj = {
    user_id: req.user._id,
    sku: req.body.sku,
    title: req.body.title,
    description: req.body.description,
    manufacture_details: JSON.parse(req.body.manufacture_details),
    shipping_details: JSON.parse(req.body.shipping_details),
    quantity: req.body.quantity,
    pricing: JSON.parse(req.body.pricing),
    variations: JSON.parse(req.body.variations),
    variation_quantity: [],
    categories: JSON.parse(req.body.categories),
    outofStock: JSON.parse(req.body.outofStock),
  };

  if(req.file){
    console.log(productObj.images.main);
    productObj.images['main'] =   req.file.path;
  }
  Product.findOne({ _id: req.params.productId })
    .then((product) => {


      for (const key in productObj) {
        product[key] = productObj[key];
      }
      console.log(product);

      return product.save()
              .then(result => { console.log(result);})
              .catch(result => { console.log(result);});

    })
    .then( (result) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        error,
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByIdAndRemove(productId)
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
 * Admin Categories
 */

exports.fetchAllCategories = (req, res, next) => {
  console.log("fetchAllCategories");
  Category.find()
    .then((categories) => {
      res.status(200).json({
        success: true,
        categories,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
};

exports.postAddCategory = (req, res, next) => {
  const category = new Category({
    title: req.body.title,
    img: req.body.img,
    subCategories: req.body.subCategories,
  });
  category
    .save()
    .then((category) => {
      res.status(201).json({
        success: true,
        categoryId: category._id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
};

exports.putEditCategory = (req, res, next) => {
  const categoryObj = {
    _id: req.params.categoryId,
    title: req.body.title,
    img: req.body.img,
    subCategories: req.body.subCategories,
  };

  Category.findOneAndUpdate({ _id: req.params.categoryId }, categoryObj)
    .then((category) => {
      res.status(201).json({
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

exports.deleteCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;

  Category.findByIdAndRemove(categoryId)
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

exports.fetchAllOrders = (req, res, next) => {
  Order.find()
    .then((orders) => {
      res.status(200).json({
        success: true,
        orders,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error,
      });
    });
};
