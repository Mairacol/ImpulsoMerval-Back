const { Course, User } = require('../models');

// Obtener todos los cursos
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos', error });
  }
};

// Crear un curso (solo admin)
exports.createCourse = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const course = await Course.create({ title, description, price });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el curso', error });
  }
};

// Inscribir al usuario en un curso
exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.params;
  const user = req.user; // Usuario autenticado

  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    await user.addCourse(course);
    res.status(200).json({ message: 'Inscripción exitosa' });
  } catch (error) {
    res.status(500).json({ message: 'Error al inscribirse en el curso', error });
  }
};

// Obtener los cursos del usuario
exports.getUserCourses = async (req, res) => {
  try {
    const courses = await req.user.getCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cursos del usuario', error });
  }
};
