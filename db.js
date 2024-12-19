// db.js
const { Sequelize } = require('sequelize');

// Configuración de la base de datos PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Asegúrate de tener el puerto en el archivo .env
  dialect: 'postgres',
  logging: false, // Desactiva logs para hacer el output más limpio
});

// Conexión a la base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Verifica la conexión
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Termina el proceso si hay un error
  }
};

module.exports = { sequelize, connectDB };
