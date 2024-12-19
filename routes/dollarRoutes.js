const express = require('express');
const { getDollarPrice } = require('../controllers/dollarController');

const router = express.Router();

// Ruta para obtener el precio del dólar
router.get('/', getDollarPrice);

module.exports = router;
