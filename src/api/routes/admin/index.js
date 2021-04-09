const express = require('express');
const router = express.Router();

router.use('/files', require('./files'));
router.use('/products', require('./products'));

module.exports = router;
