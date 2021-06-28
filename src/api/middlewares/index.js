/* global reqlib */
const { isDev, allowedIps } = reqlib('/src/config');
const logger = reqlib('/src/config/logger');

// admin routes
function adminRouterMiddleware(req, res, next) {
  if (!isDev && !allowedIps.includes(req.headers['x-forwarded-for'])) {
    logger.warn(`disallowed ip tried to reach admin table - ${req.headers['x-forwarded-for']}`);
    return next('router');
  }
  next();
}

module.exports = { adminRouterMiddleware };
