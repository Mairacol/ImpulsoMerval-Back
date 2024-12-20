const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/auth/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Asegúrate de que 'name' se asigna a 'nombre' al crear el usuario
      const newUser = await User.create({ 
        nombre: name,  // Asignando 'name' al campo 'nombre' en el modelo
        email, 
        password 
      });
  
      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        user: newUser,
      });
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({
        success: false,
        message: 'Error al registrar el usuario',
        error,
      });
    }
  });
  // Ruta para iniciar sesión
router.post('/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Buscar el usuario en la base de datos por el email
      const user = await User.findOne({ where: { email } });
  
      // Si no se encuentra el usuario
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }
  
      // Validar la contraseña
      const isPasswordValid = await user.validPassword(password);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Contraseña incorrecta',
        });
      }
  
      // Si la contraseña es válida
      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        user,
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión',
        error,
      });
    }
  });
  
module.exports = router;
