const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../db'); // Asegúrate de importar correctamente la conexión

const User = sequelize.define(
  'usuarios', // Nombre de la tabla en la base de datos
  {
    id: {
      type: DataTypes.INTEGER, // `id` es de tipo INTEGER
      autoIncrement: true, // Se incrementa automáticamente
      primaryKey: true, // Es la clave primaria
    },
    nombre: {
      type: DataTypes.STRING(50), // `nombre` con un límite de 50 caracteres
      allowNull: false, // No puede ser nulo
    },
    email: {
      type: DataTypes.STRING(100), // `email` con un límite de 100 caracteres
      allowNull: false, // No puede ser nulo
      unique: true, // Debe ser único
    },
    password: {
      type: DataTypes.STRING(255), // `password` con un límite de 255 caracteres
      allowNull: false, // No puede ser nulo
    },
    rol: {
      type: DataTypes.STRING(20), // `rol` con un límite de 20 caracteres
      defaultValue: 'usuario', // Valor por defecto: 'usuario'
    },
    fecha_registro: {
      type: DataTypes.DATE, // `fecha_registro` es de tipo timestamp
      defaultValue: DataTypes.NOW, // Valor por defecto: la hora actual
    },
  },
  {
    tableName: 'usuarios', // Asegúrate de que coincida con el nombre de la tabla en la base de datos
    timestamps: false, // No se usarán las columnas `createdAt` y `updatedAt`
  }
);

// Hook para hashear la contraseña antes de guardar el usuario
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Método para comparar la contraseña proporcionada con la almacenada
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
