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

// @desc    Obtener todas las motos para gestión
// @route   GET /api/admin/motorcycles/all
// @access  Private/Admin
router.get('/motorcycles/all', async (req, res) => {
    try {
        const motorcycles = await Motorcycle.find({})
            .populate('seller', 'name email')
            .sort({ createdAt: -1 })
            .select('name brand model year cc price status availability images description condition mileage location createdAt');

        res.json({
            motorcycles,
            total: motorcycles.length
        });
    } catch (error) {
        console.error('Error al obtener todas las motos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

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

// @desc    Publicar una nueva moto directamente
// @route   POST /api/admin/products
// @access  Private/Admin
router.post('/products', uploadImage, async (req, res) => {
    try {
        const {
            name, brand, model, year, cc, category, condition,
            mileage, price, location, description, images
        } = req.body;

        // Validar que la imagen se haya subido
        if (!images || images.length === 0) {
            return res.status(400).json({ message: 'La imagen es obligatoria.' });
        }

        const motorcycle = new Motorcycle({
            seller: req.user._id, // El admin que la publica
            name, brand, model, year, cc, category, condition,
            mileage, price, location, description,
            images: images,
            status: 'approved', // Se aprueba directamente
            availability: 'available'
        });

        const savedMotorcycle = await motorcycle.save();
        res.status(201).json(savedMotorcycle);

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: 'Datos inválidos', errors });
        }
        res.status(500).json({ message: 'Error al publicar la moto', error: error.message });
    }
});

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
