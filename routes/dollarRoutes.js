// routes/dollarRoutes.js
const express = require('express');
const router = express.Router();
const { getDollarPrice } = require('../controllers/dollarController');

// Ruta para obtener el valor del dólar (pública)
router.get('/price', getDollarPrice);

module.exports = router;
