const express = require('express');
const router = express.Router();

/**
 * POST (Save) changes with products by vendorCode
 */
router.post('/save', require('./saveChanges'));
router.post('/duplicate', require('./duplicateProductsToCategory'));

module.exports = router;
