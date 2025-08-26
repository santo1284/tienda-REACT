const express = require('express');
const router = express.Router();
const {
    getMotorcycles,
    createMotorcycle,
    getMyMotorcycles,
    getMotorcycleById,
    createMotorcycleReview
} = require('../controllers/products');
const { protect } = require('../middleware/auth');

// @route   GET api/products
// @desc    Obtener todas las motos aprobadas
// @access  Public
router.get('/', getMotorcycles);

// @route   POST api/products
// @desc    Crear una nueva moto (publicación)
// @access  Private
router.post('/', protect, createMotorcycle);

// @route   GET api/products/my-listings
// @desc    Obtener las motos publicadas por el usuario logueado
// @access  Private
router.get('/my-listings', protect, getMyMotorcycles);

// @route   GET api/products/:id
// @desc    Obtener una moto por su ID
// @access  Public (con lógica de acceso en el controlador)
router.get('/:id', getMotorcycleById);

// @route   POST api/products/:id/reviews
// @desc    Crear una nueva reseña
// @access  Private
router.post('/:id/reviews', protect, createMotorcycleReview);


// ... aquí irán más rutas de productos

module.exports = router;
