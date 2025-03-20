// controllers/userController.js
const User = require('../models/User');

// Obtener perfil del usuario autenticado (ya existente)
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id;
    if (!userId)
      return res.status(400).json({ success: false, message: 'ID de usuario no encontrado en el token' });
    
    const user = await User.findByPk(userId, {
      attributes: ['id', 'nombre', 'email', 'rol', 'fecha_registro', 'telefono', 'fechanacimiento'],
    });
    if (!user)
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener el perfil', error: error.message });
  }
};

// Obtener lista de usuarios (solo para administradores)
exports.getAllUsers = async (req, res) => {
  try {
    // Verifica que el usuario autenticado sea admin
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ success: false, message: 'Acceso denegado' });
    }
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'fecha_registro'],
    });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
  }
};
