const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
  getAllCourses,
  createCourse,
  enrollInCourse,
  getUserCourses,
} = require('../controllers/courseController');

const router = express.Router();

// Rutas de cursos
router.get('/', getAllCourses); // Obtener todos los cursos
router.post('/', protect, createCourse); // Crear un curso (solo admin)
router.post('/:courseId/enroll', protect, enrollInCourse); // Inscribir al usuario en un curso
router.get('/my-courses', protect, getUserCourses); // Obtener los cursos del usuario

module.exports = router;
