const News = require('../models/News');

const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllNews };
