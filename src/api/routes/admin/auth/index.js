const express = require('express');
const router = express.Router();

/**
 * POST login request
 */
router.post('/login', require('./login'));
router.post('/signup', require('./signup'));

module.exports = router;
