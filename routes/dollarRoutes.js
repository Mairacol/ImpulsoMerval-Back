const express = require('express');
const { getDollarPrice } = require('../controllers/dollarController');
const router = express.Router();

router.get('/price', getDollarPrice);

module.exports = router;
