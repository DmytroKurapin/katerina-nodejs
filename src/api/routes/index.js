/* global reqlib */
const express = require('express');
const router = express.Router();
const { isDev, allowedIps } = reqlib('/src/config');
const logger = reqlib('/src/config/logger');

router.use('/products', require('./products'));

// admin routes
function adminRouterMiddleware(req, res, next) {
  if (!isDev && !allowedIps.includes(req.headers['x-forwarded-for'])) {
    logger.warn(`disallowed ip tried to reach admin table - ${req.headers['x-forwarded-for']}`);
    return next('router');
  }
  next();
}

router.use('/admin', adminRouterMiddleware, require('./admin'));

module.exports = router;
