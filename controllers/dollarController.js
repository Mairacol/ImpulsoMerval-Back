const axios = require('axios');

// Obtener el precio del dólar actual desde una API externa
const getDollarPrice = async (req, res) => {
  try {
    const response = await axios.get('https://api-dolar-externa.com/v1/dollar');
    const { official, blue } = response.data;

    res.json({
      official: `$${official}`,
      blue: `$${blue}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el precio del dólar' });
  }
};

module.exports = { getDollarPrice };
