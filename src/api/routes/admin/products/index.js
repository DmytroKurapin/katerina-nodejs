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

module.exports = router;
