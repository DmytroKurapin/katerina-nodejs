/* global reqlib */
const express = require('express');
const { adminRouterMiddleware } = reqlib('/src/api/middlewares');
const router = express.Router();

router.use('/products', require('./products'));

router.use('/admin', adminRouterMiddleware, require('./admin'));
// general settings
router.use('/general', require('./general'));

module.exports = router;
