// controllers/dollarController.js
exports.getDollarPrice = async (req, res) => {
  try {
    // Ejemplo estático; en producción podrías llamar a una API externa
    const dollarPrice = { value: 350 };
    res.json(dollarPrice);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el precio del dólar', error });
  }
};
