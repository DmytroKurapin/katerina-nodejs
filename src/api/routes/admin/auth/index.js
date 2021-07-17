const express = require('express');
const router = express.Router();

/**
 * GET request - validate accessToken on App init
 */
router.get('/check', require('./check'));

/**
 * POST login request
 */
router.post('/login', require('./login'));
router.post('/signup', require('./signup'));

module.exports = router;
