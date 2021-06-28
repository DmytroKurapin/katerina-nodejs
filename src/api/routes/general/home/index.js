/* global reqlib */
const express = require('express');
const router = express.Router();
const { adminRouterMiddleware } = reqlib('/src/api/middlewares');

/**
 * POST (Set) list of vendorCodes for popular and new products on Home Page
 */
router.post('/popular', adminRouterMiddleware, require('./setPopular'));
/**
 * Get list of vendorCodes for popular and new products on Home Page
 */
router.get('/popular', require('./getPopular'));
/**
 * Get popular and new products for Home Page
 */
router.get('/products/popular', reqlib('/src/api/routes/products/getMultipleByVendorCodes'));

module.exports = router;
