const express = require('express');
const { protect, adminProtect } = require('../middlewares/authMiddleware');  // Importa los middleware
const router = express.Router();

// Ruta protegida para usuarios autenticados
router.get('/protected-route', protect, (req, res) => {
    console.log('Solicitud recibida en /protected-route');
    res.json({ message: 'Ruta protegida accesible solo con un token válido', user: req.user });
  });
  

// Ruta protegida solo para administradores
router.get('/admin-route', protect, adminProtect, (req, res) => {
  res.json({ message: 'Ruta accesible solo por administradores', user: req.user });
});

module.exports = router;
