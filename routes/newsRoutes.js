const express = require('express');
const { protect, adminProtect } = require('../middlewares/authMiddleware');
const { getAllNews, createNews } = require('../controllers/newsController');
const router = express.Router();

router.get('/', getAllNews);
router.post('/', protect, adminProtect, createNews);

module.exports = router;
