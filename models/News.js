// models/News.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const News = sequelize.define('News', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  authorId: { 
    type: DataTypes.INTEGER, // Relación con el id de usuario
    allowNull: false 
  },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = News;
