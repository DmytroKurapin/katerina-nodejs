/* global reqlib */
const express = require('express');
const router = express.Router();
const { isDev, allowedIps } = require('../../config');
// const { isDev, allowedIps } = reqlib('/src/config');

// console.log(999)

router.use('/products',  require('./products'));

// admin routes
function adminRouterMiddleware(req, res, next) {
	console.log(req.headers['x-forwarded-for'])
  if (!isDev && !allowedIps.includes(req.headers['x-forwarded-for'])) {
    return next('router');
  }
  next();
}

router.use('/admin', adminRouterMiddleware, require('./admin'));

// router.use('*', (req) => {console.log(req)})

module.exports = router;
