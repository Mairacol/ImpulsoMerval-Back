// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middlewares/authMiddleware');
const { getAllCourses, createCourse, enrollInCourse, getUserCourses } = require('../controllers/courseController');

router.get('/', getAllCourses);
router.post('/', protect, adminProtect, createCourse);
router.post('/:courseId/enroll', protect, enrollInCourse);
router.get('/my-courses', protect, getUserCourses);

module.exports = router;
