// routes/dollarRoutes.js
const express = require('express');
const router = express.Router();
const { getDollarPrice } = require('../controllers/dollarController');

router.get('/price', getDollarPrice);

module.exports = router;
