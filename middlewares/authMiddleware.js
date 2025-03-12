// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware de autenticación
const protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token)
      return res.status(401).json({ message: 'No se proporcionó un token' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId || decoded.id);
    if (!user)
      return res.status(404).json({ message: 'Usuario no encontrado' });
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
    return res.status(401).json({ message: 'Token inválido o expirado', error: error.message });
  }
};

// Middleware de autenticación para administradores
const adminProtect = (req, res, next) => {
  try {
    if (!req.user)
      return res.status(401).json({ message: 'No autenticado' });
    if (req.user.rol !== 'admin')
      return res.status(403).json({ message: 'No autorizado' });
    next();
  } catch (error) {
    console.error('Error al verificar rol de admin:', error.message);
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

module.exports = { protect, adminProtect };
