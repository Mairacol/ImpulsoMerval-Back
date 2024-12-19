// server.js
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const express = require('express');
const { connectDB } = require('./db'); // Importa la función connectDB desde db.js

const app = express();

// Llama a la función de conexión para asegurarte de que la base de datos está conectada
connectDB();

// Configura el puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Puedes agregar rutas aquí, por ejemplo:
app.get('/', (req, res) => {
  res.send('¡Servidor y base de datos conectados correctamente!');
});
