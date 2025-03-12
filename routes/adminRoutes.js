const express = require('express');
const router = express.Router();
const { getAdminDashboard } = require('../controllers/adminController');
const { getAllUsers } = require('../controllers/userController'); // Asegúrate de que getAllUsers esté exportado

// Endpoint para datos generales del dashboard (opcional)
router.get('/admin-dashboard', getAdminDashboard);

// Endpoint para obtener la lista de usuarios (solo para admin)
router.get('/users', getAllUsers);

module.exports = router;
