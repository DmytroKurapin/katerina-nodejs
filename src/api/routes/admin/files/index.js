const express = require('express');
const router = express.Router();

/**
 * POST (Save) multiple files on server
 */
// router.post('/', require('./uploadMultiple'));

/**
 * PUT (Save) single file on server
 */
router.put('/', require('./uploadSingle'));

module.exports = router;
