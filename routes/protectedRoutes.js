// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middlewares/authMiddleware');
const { getUserProfile, getAdminData } = require('../controllers/userController');

// Ruta protegida para usuarios autenticados
router.get('/protected-route', protect, (req, res) => {
  res.json({ message: 'Ruta protegida accesible solo con un token válido', user: req.user });
});

// Ruta para obtener el perfil del usuario autenticado
router.get('/user-profile', protect, getUserProfile);

// Ruta protegida para administradores
router.get('/admin-route', protect, adminProtect, (req, res) => {
  res.json({ message: 'Ruta accesible solo por administradores', user: req.user });
});

// Dashboard del administrador
router.get('/admin-dashboard', protect, adminProtect, getAdminData);

module.exports = router;
