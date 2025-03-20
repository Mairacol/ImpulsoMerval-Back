// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
exports.register = async (req, res) => {
  console.log('Datos recibidos:', req.body); // Verifica el payload
  const { name, email, password, telefono, fechaNacimiento } = req.body;
  try {
    const newUser = await User.create({
      nombre: name,
      email,
      password, // Se encripta mediante el hook en el modelo
      telefono, 
      fechanacimiento: fechaNacimiento 
    });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ success: false, message: 'Error al registrar el usuario', error });
  }
};


// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
    
    // Genera el token incluyendo el rol
    const token = jwt.sign(
      { userId: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ success: true, token, role: user.rol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: error.message });
  }
};
