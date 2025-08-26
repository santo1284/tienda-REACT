const Motorcycle = require('../models/Motorcycle');
const User = require('../models/User'); // Asegúrate de tener el modelo User también

// @desc    Obtener todas las motos aprobadas
// @route   GET /api/products
// @access  Public
const getMotorcycles = async (req, res) => {
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
};

// @desc    Crear una nueva moto
// @route   POST /api/products
// @access  Private
const createMotorcycle = async (req, res) => {
  try {
    console.log('Datos recibidos en createMotorcycle:', req.body);
    console.log('Usuario autenticado:', req.user);

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
      description
    } = req.body;

    // Validaciones básicas
    if (!name || !brand || !model || !year || !cc || !price || !description) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios',
        required: ['name', 'brand', 'model', 'year', 'cc', 'price', 'description']
      });
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
      images: [{
        url: 'https://via.placeholder.com/400x300.png?text=Imagen+Temporal',
        public_id: 'placeholder'
      }], // Imagen temporal mientras se implementa la subida real
      status: 'pending' // Requiere aprobación de admin
    });

    const savedMotorcycle = await motorcycle.save();
    
    // Poblar la información del vendedor antes de enviar
    await savedMotorcycle.populate('seller', 'name email');

    console.log('Moto creada exitosamente:', savedMotorcycle._id);

    res.status(201).json({
      message: 'Moto creada exitosamente. Será revisada antes de publicarse.',
      motorcycle: savedMotorcycle
    });

  } catch (error) {
    console.error('Error en createMotorcycle:', error);
    
    // Manejar errores de validación de MongoDB
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
};

// @desc    Obtener las motos del usuario logueado
// @route   GET /api/products/my-listings
// @access  Private
const getMyMotorcycles = async (req, res) => {
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
};

// @desc    Obtener una moto por ID
// @route   GET /api/products/:id
// @access  Public
const getMotorcycleById = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id)
      .populate('seller', 'name email')
      .populate('reviews.user', 'name');

    if (!motorcycle) {
      return res.status(404).json({ message: 'Moto no encontrada' });
    }

    // Solo mostrar motos aprobadas a usuarios no autenticados
    // Los propietarios y admins pueden ver sus propias motos en cualquier estado
    if (motorcycle.status !== 'approved' && 
        (!req.user || (req.user._id.toString() !== motorcycle.seller._id.toString() && req.user.role !== 'admin'))) {
      return res.status(404).json({ message: 'Moto no encontrada' });
    }

    // Incrementar contador de vistas (solo si no es el propietario)
    if (!req.user || req.user._id.toString() !== motorcycle.seller._id.toString()) {
      motorcycle.views += 1;
      await motorcycle.save();
    }

    res.json(motorcycle);
  } catch (error) {
    console.error('Error en getMotorcycleById:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Moto no encontrada' });
    }
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// @desc    Crear una reseña
// @route   POST /api/products/:id/reviews
// @access  Private
const createMotorcycleReview = async (req, res) => {
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
};

module.exports = {
  getMotorcycles,
  createMotorcycle,
  getMyMotorcycles,
  getMotorcycleById,
  createMotorcycleReview
};