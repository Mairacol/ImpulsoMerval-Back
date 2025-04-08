// controllers/dollarController.js
const axios = require('axios');

let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minuto

const getDollarPrice = async (req, res) => {
  const now = Date.now();

  if (cachedData && (now - lastFetchTime < CACHE_DURATION)) {
    console.log('⏱️ Usando datos cacheados del dólar');
    return res.json(cachedData);
  }

  try {
    const response = await axios.get('https://dolarapi.com/v1/dolares');
    const data = response.data;

    // Mapear los nombres que necesitas
    const mappedRates = {
      dolarBlue: data.find(d => d.nombre === 'Blue'),
      dolarOficial: data.find(d => d.nombre === 'Oficial'),
      dolarMep: data.find(d => d.nombre === 'Bolsa'),
      liqui: data.find(d => d.nombre === 'Contado con Liqui'),
      tarjeta: data.find(d => d.nombre === 'Tarjeta'),
      cripto: data.find(d => d.nombre === 'Cripto'),
    };

    // Reestructuramos el formato como el frontend espera
    const formattedRates = {
      dolarBlue: { compra: mappedRates.dolarBlue?.compra, venta: mappedRates.dolarBlue?.venta },
      dolarOficial: { compra: mappedRates.dolarOficial?.compra, venta: mappedRates.dolarOficial?.venta },
      dolarMep: { compra: mappedRates.dolarMep?.compra, venta: mappedRates.dolarMep?.venta },
      liqui: { compra: mappedRates.liqui?.compra, venta: mappedRates.liqui?.venta },
      tarjeta: { compra: mappedRates.tarjeta?.compra, venta: mappedRates.tarjeta?.venta },
      cripto: { compra: mappedRates.cripto?.compra, venta: mappedRates.cripto?.venta }
    };

    // Cachear
    cachedData = formattedRates;
    lastFetchTime = now;

    console.log('📡 Datos actualizados desde la API');
    res.json(formattedRates);
  } catch (error) {
    console.error("❌ Error al obtener datos desde dolarapi:", error.message);
    res.status(500).json({ error: "No se pudo obtener el valor del dólar desde la API." });
  }
};

module.exports = { getDollarPrice };
