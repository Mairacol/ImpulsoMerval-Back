const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de que esta ruta sea correcta

const protect = async (req, res, next) => {
    console.log('Token recibido:', req.header('Authorization'));  // Agrega esta línea para ver si llega el token
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      console.log('Falta el token');
      return res.status(401).json({ message: 'No se proporcionó un token' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decodificado:', decoded);
  
      req.user = await User.findByPk(decoded.id);
      if (!req.user) {
        console.log('Usuario no encontrado');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      next();
    } catch (error) {
      console.log('Error al verificar el token:', error.message);
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  };
  
  
// Middleware para verificar si el usuario es admin
const adminProtect = (req, res, next) => {
  if (req.user && req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'No autorizado' });
  }
  next(); // Si es admin, continua con la siguiente función
};

module.exports = { protect, adminProtect };
