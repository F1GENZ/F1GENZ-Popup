const express = require('express');
const { getAuth } = require('../controllers/authController');
const router = express.Router();

router.get('/account', getAuth);

module.exports = router;