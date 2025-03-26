require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./db');
const cors = require('cors');
const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');
const app = express();

// Importar rutas (una sola vez)
const userRoutes = require('./routes/userRoutes');
const dollarRoutes = require('./routes/dollarRoutes');
const newsRoutes = require('./routes/newsRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const courseRoutes = require('./routes/courseRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Configuración de CORS y parseo de JSON
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Conectar a la base de datos
connectDB();

// --- Rutas públicas (sin autenticación) ---
// Rutas de autenticación
app.use('/api/auth', userRoutes);
// Rutas públicas de dólar y noticias
app.use('/api/dollar', dollarRoutes);
app.use('/api/news', newsRoutes);

// --- Middleware de autenticación ---
// Se aplica a las rutas que siguen
const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: true,
});

// --- Rutas protegidas ---
app.use('/api', isAuthenticated, protectedRoutes);
app.use('/api/courses', isAuthenticated, courseRoutes);
app.use('/api/admin', isAuthenticated, adminRoutes);

// Otras rutas
app.get('/', (req, res) => {
  res.send('¡Servidor y base de datos conectados correctamente!');
});
app.get('/test-db', async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT NOW()');
    res.status(200).json({ success: true, time: results[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al consultar la base de datos', error });
  }
});
app.post('/api/auth/simulated-login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ id: 1, username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
