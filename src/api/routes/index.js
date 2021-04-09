const express = require('express');
const router = express.Router();

router.use('/products', require('./products'));

// admin routes
// todo add middleware for admin routes

router.use('/admin', require('./admin'));

module.exports = router;
