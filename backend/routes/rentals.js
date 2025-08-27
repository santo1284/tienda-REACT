const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');

// @desc    Obtener todos los alquileres disponibles para el público
// @route   GET /api/rentals
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Busca alquileres que no estén rentados o en mantenimiento
    const availableRentals = await Rental.find({
      availability: { $in: ['available', 'reserved'] }
    }).sort({ createdAt: -1 });

    res.json(availableRentals);
  } catch (error) {
    console.error('Error al obtener alquileres públicos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
