/* global reqlib */
const express = require('express');
const router = express.Router();
// const config = reqlib('/src/config/init');
const config = require('../../../config/init');

router.use('/files', require('./files'));

router.use('/products', require('./products'));
router.use('/auth', config.requestsLimiter, require('./auth'));

module.exports = router;
