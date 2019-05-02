const express = require('express');
const router = express.Router();

router.use('/api/users', require('./user'));
router.use('/oauth2', require('./oauth2'));
router.use('/about', require('./about'));

module.exports = router;