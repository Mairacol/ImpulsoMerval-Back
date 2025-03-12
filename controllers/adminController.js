// controllers/adminController.js
const getAdminDashboard = async (req, res) => {
  try {
    // Ejemplo de datos para el dashboard
    const adminData = {
      usersCount: 100,
      donationsCount: 50,
    };
    res.status(200).json({ success: true, data: adminData });
  } catch (error) {
    console.error('Error al obtener datos del dashboard de administrador:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al obtener los datos del dashboard de administrador', 
      error 
    });
  }
};

module.exports = { getAdminDashboard };
