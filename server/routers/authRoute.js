const express = require('express');
const router = express.Router();
const { getAuth } = require('../controllers/authController');

router.get('/account', getAuth);

module.exports = router;