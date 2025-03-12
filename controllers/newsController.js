// controllers/newsController.js
const News = require('../models/News');

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las noticias', error });
  }
};

exports.createNews = async (req, res) => {
  const { title, content } = req.body;
  try {
    const news = await News.create({ title, content, authorId: req.user.id });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la noticia', error });
  }
};
