require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./db');
const cors = require('cors');
const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');
const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas públicas (auth)
const userRoutes = require('./routes/userRoutes');
app.use('/api/auth', userRoutes);

// Middleware de autenticación para rutas protegidas
const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  credentialsRequired: true,
});

// Rutas protegidas
const protectedRoutes = require('./routes/protectedRoutes');
const courseRoutes = require('./routes/courseRoutes');
const dollarRoutes = require('./routes/dollarRoutes');
const newsRoutes = require('./routes/newsRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Todas las rutas que inicien con /api a continuación requieren token válido
app.use('/api', isAuthenticated, protectedRoutes);
app.use('/api/courses', isAuthenticated, courseRoutes);
app.use('/api/dollar', isAuthenticated, dollarRoutes);
app.use('/api/news', isAuthenticated, newsRoutes);
app.use('/api/admin', isAuthenticated, adminRoutes);

app.get('/', (req, res) => {
  res.send('¡Servidor y base de datos conectados correctamente!');
});

// Ruta para testear la conexión a la DB
app.get('/test-db', async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT NOW()');
    res.status(200).json({ success: true, time: results[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al consultar la base de datos', error });
  }
});

// Ruta de login simulada (opcional)
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
