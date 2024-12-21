const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear un nuevo usuario
    const user = await User.create({ name, email, password: hashedPassword });

    // Devolver una respuesta sin incluir la contraseña
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      fecha_registro: user.fecha_registro
    };

    res.status(201).json({ success: true, user: userResponse });
  } catch (error) {
    console.error(error); // Para depuración
    res.status(500).json({ success: false, message: 'Error al registrar el usuario', error: error.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver el token al cliente
    res.json({ success: true, token });
  } catch (error) {
    console.error(error); // Para depuración
    res.status(500).json({ success: false, message: 'Error al iniciar sesión', error: error.message });
  }
};
