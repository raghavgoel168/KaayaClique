const express = require('express');
const router = express.Router();
const formidable = require('express-formidable');

const { requireLogin, requireAdmin} = require('../middlewares/authMiddleware.js');
const { createProductController,
        getAllProductsController,
        getSingleProductController,
        productPhotoController,
        deleteProductController,
        updateProductController,
        productFiltersController,
        productCountController,
        productPerPageController,
        searchProductController,
        similarProductController,
        categoryWiseProductController,
        braintreeTokenController,
        braintreePaymentsController } = require('../controllers/productController.js');

// create product
router.post('/create-product', requireLogin, requireAdmin, formidable(), createProductController);

// get all products
router.get('/all-products', getAllProductsController);

// get single product
router.get('/single-product/:slug', getSingleProductController);

// get product photo
router.get('/product-photo/:pid', productPhotoController);

// delete product
router.delete('/delete-product/:pid', deleteProductController);

// update product
router.put('/update-product/:pid', requireLogin, requireAdmin, formidable(), updateProductController);

// filter products
router.post('/product-filters', productFiltersController);

// product count
router.get('/product-count', productCountController);

// product per page
router.get('/product-per-page/:page', productPerPageController);

// search product
router.get('/search/:keyword', searchProductController);

// similar products
router.get('/similar-products/:pid/:cid', similarProductController);

// category wise products
router.get('/product-category/:slug', categoryWiseProductController);

// payement token route
router.get('/braintree/token', braintreeTokenController);

// payment route
router.post('/braintree/payment', requireLogin,  braintreePaymentsController);

module.exports = router;