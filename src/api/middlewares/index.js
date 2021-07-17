/* global reqlib */
const { isDev, allowedIps } = reqlib('/src/config');
const logger = reqlib('/src/config/logger');
const { validateAccessToken, createAccessToken } = reqlib('/src/services/authHelpers');

// admin routes
async function adminRouterMiddleware(req, res, next) {
  const { 'x-auth': authHeader, 'x-forwarded-for': forwardedFor } = req.headers;
  const isRegisterPath = ['/auth/signup', '/auth/login'].includes(req.url);
  let accessToken = null;
  let isTokenValid = false;

  if (!authHeader && !isRegisterPath) {
    return res.sendStatus(401);
  } else if (isRegisterPath) {
    accessToken = createAccessToken(req.body.user);
    isTokenValid = !!accessToken;
  } else {
    const token = authHeader.split(' ')[1];
    ({ accessToken, isValid: isTokenValid } = validateAccessToken(token));
  }

  if (!isTokenValid || (!isDev && !allowedIps.includes(forwardedFor))) {
    logger.warn(`disallowed ip tried to reach admin table - ${forwardedFor} or token is not valid`);
    // To skip the rest of the router’s middleware functions call next('router')
    // in order to skip to the next route middleware next('route')
    return res.sendStatus(403);
  }
  req.accessToken = accessToken;
  next();
}

module.exports = { adminRouterMiddleware };
