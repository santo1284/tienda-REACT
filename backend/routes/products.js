const express = require('express');
const router = express.Router();
const Motorcycle = require('../models/Motorcycle');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');
const { uploadImage } = require('../middleware/upload');


// @desc    Obtener todas las motos aprobadas
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    
    // Filtros opcionales
    const keyword = req.query.keyword ? {
      $or: [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { brand: { $regex: req.query.keyword, $options: 'i' } },
        { model: { $regex: req.query.keyword, $options: 'i' } }
      ]
    } : {};
    
    const category = req.query.category ? { category: req.query.category } : {};
    const minPrice = req.query.minPrice ? { price: { $gte: req.query.minPrice } } : {};
    const maxPrice = req.query.maxPrice ? { price: { $lte: req.query.maxPrice } } : {};
    
    const query = {
      status: 'approved',
      ...keyword,
      ...category,
      ...minPrice,
      ...maxPrice
    };

    const count = await Motorcycle.countDocuments(query);
    const motorcycles = await Motorcycle.find(query)
      .populate('seller', 'name email')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      motorcycles,
      page,
      pages: Math.ceil(count / pageSize),
      total: count
    });
  } catch (error) {
    console.error('Error en getMotorcycles:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

// @desc    Crear una nueva moto (propuesta de venta)
// @route   POST /api/products
// @access  Private
router.post('/', protect, uploadImage, async (req, res) => {
  try {
    const {
      name,
      brand,
      model,
      year,
      cc,
      category,
      condition,
      mileage,
      price,
      location,
      description,
      images // Inyectado por el middleware uploadImage
    } = req.body;

    // Validaciones básicas
    if (!name || !brand || !model || !year || !cc || !price || !description) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios',
        required: ['name', 'brand', 'model', 'year', 'cc', 'price', 'description']
      });
    }

    // La imagen es requerida para una nueva propuesta
    if (!images || images.length === 0) {
      return res.status(400).json({ message: 'La imagen es obligatoria.' });
    }

    // Crear nueva moto
    const motorcycle = new Motorcycle({
      seller: req.user._id,
      name: name.trim(),
      brand: brand.trim(),
      model: model.trim(),
      year: parseInt(year),
      cc: parseInt(cc),
      category,
      condition: condition || 'Bueno',
      mileage: mileage ? parseInt(mileage) : undefined,
      price: parseInt(price),
      location: location || 'Garzón, Huila',
      description: description.trim(),
      images: images, // Usar la imagen de Cloudinary
      status: 'pending' // Requiere aprobación de admin
    });

    const savedMotorcycle = await motorcycle.save();
    
    await savedMotorcycle.populate('seller', 'name email');

    res.status(201).json({
      message: 'Propuesta de venta enviada exitosamente. Será revisada por un administrador.',
      motorcycle: savedMotorcycle
    });

  } catch (error) {
    console.error('Error en createMotorcycle:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ 
        message: 'Datos inválidos', 
        errors 
      });
    }

    res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
});

// @desc    Obtener las motos del usuario logueado
// @route   GET /api/products/my-listings
// @access  Private
router.get('/my-listings', protect, async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({ seller: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      motorcycles,
      total: motorcycles.length
    });
  } catch (error) {
    console.error('Error en getMyMotorcycles:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar que el ID sea válido para MongoDB
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'ID de producto no válido' });
    }

    const motorcycle = await Motorcycle.findById(id)
      .populate('seller', 'name email')
      .populate('reviews.user', 'name');
    
    if (!motorcycle) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Solo mostrar productos aprobados a usuarios no autenticados
    // Los vendedores y admins pueden ver sus propios productos
    const authHeader = req.headers.authorization;
    let isOwnerOrAdmin = false;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const user = await User.findById(decoded.id);
        
        if (user && (user.role === 'admin' || motorcycle.seller._id.toString() === user._id.toString())) {
          isOwnerOrAdmin = true;
        }
      } catch (tokenError) {
        // Token inválido, continuar como usuario no autenticado
      }
    }

    // Si no es el propietario/admin y el producto no está aprobado, no mostrarlo
    if (!isOwnerOrAdmin && motorcycle.status !== 'approved') {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(motorcycle);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

// @desc    Obtener una moto por ID
// @route   GET /api/products/:id
// @access  Public (con autenticación opcional)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar que el ID sea válido para MongoDB
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'ID de producto no válido' });
    }

    const motorcycle = await Motorcycle.findById(id)
      .populate('seller', 'name email')
      .populate('reviews.user', 'name');
    
    if (!motorcycle) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Solo mostrar productos aprobados a usuarios no autenticados
    // Los vendedores y admins pueden ver sus propios productos
    const authHeader = req.headers.authorization;
    let isOwnerOrAdmin = false;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        const user = await User.findById(decoded.id);
        
        if (user && (user.role === 'admin' || motorcycle.seller._id.toString() === user._id.toString())) {
          isOwnerOrAdmin = true;
        }
      } catch (tokenError) {
        // Token inválido, continuar como usuario no autenticado
      }
    }

    // Si no es el propietario/admin y el producto no está aprobado, no mostrarlo
    if (!isOwnerOrAdmin && motorcycle.status !== 'approved') {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(motorcycle);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

// @desc    Crear una reseña
// @route   POST /api/products/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating y comentario son requeridos' });
    }

    const motorcycle = await Motorcycle.findById(req.params.id);

    if (!motorcycle) {
      return res.status(404).json({ message: 'Moto no encontrada' });
    }

    if (motorcycle.status !== 'approved') {
      return res.status(400).json({ message: 'No puedes reseñar una moto no aprobada' });
    }

    // Verificar que el usuario no sea el vendedor
    if (motorcycle.seller.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'No puedes reseñar tu propia moto' });
    }

    // Verificar si el usuario ya reseñó esta moto
    const alreadyReviewed = motorcycle.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Ya has reseñado esta moto' });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    motorcycle.reviews.push(review);
    motorcycle.numReviews = motorcycle.reviews.length;

    // Calcular nuevo rating promedio
    motorcycle.rating = motorcycle.reviews.reduce((acc, item) => item.rating + acc, 0) / motorcycle.reviews.length;

    await motorcycle.save();

    res.status(201).json({ message: 'Reseña agregada exitosamente' });
  } catch (error) {
    console.error('Error en createMotorcycleReview:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

module.exports = router;