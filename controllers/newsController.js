const { News } = require('../models');

// Obtener todas las noticias
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({ include: 'author' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las noticias', error });
  }
};

// Crear una noticia (solo admin)
exports.createNews = async (req, res) => {
  const { title, content } = req.body;

  try {
    const news = await News.create({ title, content, authorId: req.user.id });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la noticia', error });
  }
};
