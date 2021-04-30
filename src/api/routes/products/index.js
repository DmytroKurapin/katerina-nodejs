const express = require('express');
const router = express.Router();

/**
 * GET all products by category
 */
router.get('/category/:category/:order?/:newFirst?', require('./getByCategory'));
/**
 * GET product by vendor code
 */
router.get('/vendor/:vendorCode', require('./getOneByVendorCode'));
/**
 * GET products by vendor codes
 */
router.get('/vendors', require('./getMultipleByVendorCodes'));

module.exports = router;
