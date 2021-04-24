var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var uploadFile = require('../middlewares/uploadFileBusBoy');

const errorsController = require('../controllers/errors.controller');

var usersRouter = require('./users.route');
var adminRouter = require('./admin.route');
var productsRouter = require('./products.route');
var categoriesRouter = require('./categories.route');
var authRouter = require('./auth.route');

console.log('in router index');


router.use('/products', productsRouter);

router.use('/categories', categoriesRouter);

router.use('/admin', adminRouter);

router.use('/users', usersRouter);

router.use('/auth', authRouter);



router.post('/trythis', uploadFile, (req, res, next) => {
  console.log('/trythis finally uploaded', req.body);
})

router.use('/', (req,res,next) => {
  res.json({'function': 'api only'});
});

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  console.log('create 404')
  next(createError(404));
});

// error handler
router.use(errorsController.handleError);

module.exports = router;
