const express = require('express');
const router = express.Router();

router.use('/products', require('./products'));
router.use('/files', require('./files'));

module.exports = router;
