/* global reqlib */
const express = require('express');
const router = express.Router();
const { isDev, allowedIps } = require('../../config');
// const { isDev, allowedIps } = reqlib('/src/config');

router.use('/products', require('./products'));

// admin routes
function adminRouterMiddleware(req, res, next) {
  if (!isDev && !allowedIps.includes(req.ip)) {
    return next('router');
  }
  next();
}

router.use('/admin', adminRouterMiddleware, require('./admin'));

module.exports = router;
