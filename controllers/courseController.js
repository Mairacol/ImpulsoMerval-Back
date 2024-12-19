const Course = require('../models/Course');
const UserCourse = require('../models/UserCourse');

// Obtener todos los cursos
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un curso (solo admin)
const createCourse = async (req, res) => {
  const { title, description, price } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'No autorizado para crear cursos' });
  }

  try {
    const course = await Course.create({ title, description, price });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Inscribir a un usuario en un curso
const enrollInCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    await UserCourse.create({ UserId: req.user.id, CourseId: courseId });
    res.json({ message: 'Usuario inscrito en el curso exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener los cursos del usuario
const getUserCourses = async (req, res) => {
  try {
    const userCourses = await UserCourse.findAll({
      where: { UserId: req.user.id },
      include: ['Course'],
    });
    res.json(userCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllCourses, createCourse, enrollInCourse, getUserCourses };
