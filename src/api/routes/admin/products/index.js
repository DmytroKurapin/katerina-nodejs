const express = require('express');
const router = express.Router();

/**
 * POST (Save) changes with products by vendorCode
 */
router.post('/save', require('./saveChanges'));
/**
 * POST (Insert) cloned products to another category
 */
router.post('/duplicate', require('./duplicateProductsToCategory'));
/**
 * GET all products by category
 */
router.get('/category/:category/:order?/:sorting?', require('./getByCategory'));

module.exports = router;
