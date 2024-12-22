const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
      }
  
      const isPasswordValid = await user.validPassword(password);
  
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Contraseña incorrecta',
        });
      }
  
      // Crear el token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, nombre: user.nombre },
        process.env.JWT_SECRET, // Asegúrate de tener esta clave en tu archivo .env
        { expiresIn: '1h' } // El token expirará en 1 hora
      );
  
      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
          fecha_registro: user.fecha_registro,
        },
        token, // Aquí se envía el token JWT al cliente
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
