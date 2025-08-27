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
const { uploadImage } = require('../middleware/upload');

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
    .post(uploadImage, createRental)
    .get(getRentals);

router.route('/rentals/:id')
    .put(updateRental)
    .delete(deleteRental);

// @desc    Obtener todas las transacciones
// @route   GET /api/admin/transactions
// @access  Private/Admin
const Transaction = require('../models/Transaction');
router.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find({})
            .populate('user', 'name email phone') // Poblar datos del usuario
            .populate('item') // Poblar datos del artículo (moto o alquiler)
            .sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        console.error('Error al obtener transacciones:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// @desc    Actualizar disponibilidad de una moto
// @route   PUT /api/admin/motorcycles/:id/availability
// @access  Private/Admin
const Motorcycle = require('../models/Motorcycle');
router.put('/motorcycles/:id/availability', async (req, res) => {
    try {
        const { availability } = req.body;
        if (!availability) {
            return res.status(400).json({ message: 'El estado de disponibilidad es requerido.' });
        }

        const motorcycle = await Motorcycle.findById(req.params.id);
        if (!motorcycle) {
            return res.status(404).json({ message: 'Motocicleta no encontrada.' });
        }

        motorcycle.availability = availability;
        await motorcycle.save();
        res.json(motorcycle);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la disponibilidad.', error: error.message });
    }
});

// @desc    Actualizar disponibilidad de un alquiler
// @route   PUT /api/admin/rentals/:id/availability
// @access  Private/Admin
const Rental = require('../models/Rental');
router.put('/rentals/:id/availability', async (req, res) => {
    try {
        const { availability } = req.body;
        if (!availability) {
            return res.status(400).json({ message: 'El estado de disponibilidad es requerido.' });
        }

        const rental = await Rental.findById(req.params.id);
        if (!rental) {
            return res.status(404).json({ message: 'Alquiler no encontrado.' });
        }

        rental.availability = availability;
        await rental.save();
        res.json(rental);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la disponibilidad.', error: error.message });
    }
});


module.exports = router;
