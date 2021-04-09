const express = require('express');
const router = express.Router();

/**
 * POST (Save) changes with products by vendorCode
 */
router.post('/save', require('./saveChanges'));

module.exports = router;
