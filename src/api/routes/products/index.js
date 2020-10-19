const express = require('express');
const router = express.Router();

/**
 * GET request to /products/:category
 */
router.get('/category/:category', require('./getByCategory'));

module.exports = router;

