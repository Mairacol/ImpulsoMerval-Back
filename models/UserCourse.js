// models/UserCourse.js
const { sequelize } = require('../db');
const User = require('./User');
const Course = require('./Course');

const UserCourse = sequelize.define('UserCourse', {}, { timestamps: false });

User.belongsToMany(Course, { through: UserCourse });
Course.belongsToMany(User, { through: UserCourse });

module.exports = UserCourse;
