// Obtener el precio del dólar
exports.getDollarPrice = async (req, res) => {
    try {
      // Aquí puedes agregar una llamada a una API externa o calcular el precio del dólar
      const dollarPrice = { value: 350 }; // Ejemplo estático
      res.json(dollarPrice);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el precio del dólar', error });
    }
  };
  