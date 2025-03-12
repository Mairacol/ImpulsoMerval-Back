// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middlewares/authMiddleware');
const { getUserProfile, getAllUsers } = require('../controllers/userController');

// Ruta para obtener el perfil del usuario autenticado
router.get('/user-profile', protect, getUserProfile);

// Ruta para obtener la lista de usuarios (solo accesible por administradores)
router.get('/users', protect, adminProtect, getAllUsers);

module.exports = router;
