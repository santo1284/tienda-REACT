const express = require('express');
const router = express.Router();
const {
    getPendingMotorcycles,
    updateMotorcycleStatus,
    createRental,
    getRentals,
    updateRental,
    deleteRental
} = require('../controllers/admin');
const { protect, admin } = require('../middleware/auth');

// Todas las rutas en este archivo están protegidas y requieren rol de admin
router.use(protect, admin);

// Motorcycle approval routes
// @route   GET /api/admin/motorcycles/pending
// @desc    Obtener motos pendientes de revisión
// @access  Private/Admin
router.get('/motorcycles/pending', getPendingMotorcycles);

// @route   PUT /api/admin/motorcycles/:id/status
// @desc    Actualizar estado de una moto
// @access  Private/Admin
router.put('/motorcycles/:id/status', updateMotorcycleStatus);

// Rental management routes
router.route('/rentals')
    .post(createRental)
    .get(getRentals);

router.route('/rentals/:id')
    .put(updateRental)
    .delete(deleteRental);

module.exports = router;
