require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const express = require('express');
const { connectDB } = require('./db'); // Importa la función connectDB desde db.js
const userRoutes = require('./routes/userRoutes'); // Importa las rutas de usuario
const protectedRoutes = require('./routes/protectedRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
// Middleware para manejar solicitudes JSON
app.use(express.json());

// Llama a la función de conexión para asegurarte de que la base de datos está conectada
connectDB();

// Registrar las rutas de usuario, solo es necesario usar una de estas dos líneas
// Rutas de usuario
app.use('/api/auth', userRoutes);  // Usar prefijo '/api/auth' para las rutas de usuario
app.use('/api', protectedRoutes);   // Usar '/api' para las rutas protegidas


// Configura el puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Puedes agregar rutas aquí, por ejemplo:
app.get('/', (req, res) => {
  res.send('¡Servidor y base de datos conectados correctamente!');
});

// Ruta para verificar la conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT NOW()'); // Ejecuta una consulta básica
    res.status(200).json({ success: true, time: results[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al consultar la base de datos', error });
  }
});
