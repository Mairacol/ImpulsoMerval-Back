const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de que esta ruta sea correcta

// Middleware para verificar que el token es válido
const protect = async (req, res, next) => {
  // Extraemos el token del encabezado Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token' });
  }

  try {
    // Verificamos el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscamos al usuario en la base de datos usando el id del JWT
    req.user = await User.findByPk(decoded.id); // Asegúrate de que el JWT tenga 'id' en su payload

    if (!req.user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    next(); // Si todo está bien, continuamos con la siguiente función
  } catch (error) {
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
