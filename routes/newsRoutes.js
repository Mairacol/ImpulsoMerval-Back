// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const { protect, adminProtect } = require('../middlewares/authMiddleware');
const { getAllNews, createNews } = require('../controllers/newsController');

router.get('/', getAllNews);
router.post('/', protect, adminProtect, createNews);

module.exports = router;
