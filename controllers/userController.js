const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Asegúrate de que la ruta sea correcta

// Registro de usuario
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Creamos el usuario en la base de datos
    const user = await User.create({ name, email, password: hashedPassword });
    
    // Respondemos con éxito
    res.status(201).json({ success: true, user });
  } catch (error) {
    // En caso de error, respondemos con el error
    res.status(500).json({ success: false, message: 'Error al registrar el usuario', error });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscamos el usuario por correo electrónico
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Si no encontramos el usuario, respondemos con un error
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Comparamos la contraseña ingresada con la almacenada (hash)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Si la contraseña no coincide, respondemos con un error
      return res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
    }

    // Si las credenciales son correctas, creamos un token JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respondemos con el token
    res.json({ success: true, token });
  } catch (error) {
    // En caso de error, respondemos con el error
    res.status(500).json({ success: false, message: 'Error al iniciar sesión', error });
  }
};
