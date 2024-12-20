const express = require('express');
const { protect, adminProtect } = require('../middlewares/authMiddleware');
const {
  getAllCourses,
  createCourse,
  enrollInCourse,
  getUserCourses
} = require('../controllers/courseController');

const router = express.Router();

router.get('/', getAllCourses);
router.post('/', protect, adminProtect, createCourse);
router.post('/:courseId/enroll', protect, enrollInCourse);
router.get('/my-courses', protect, getUserCourses);

module.exports = router;
