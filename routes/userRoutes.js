const express = require('express');
const router = express.Router();

// Importar controladores de autenticación
const { register, login } = require('../controllers/authController');
// Importar controladores del perfil
const { getUserProfile, updatePhoneNumber } = require('../controllers/userController');
// Importar el middleware de autenticación
const { protect } = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas para el perfil del usuario
router.get('/user-profile', protect, getUserProfile);
router.put('/user-profile/phone', protect, updatePhoneNumber);

module.exports = router;
