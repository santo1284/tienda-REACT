const Motorcycle = require('../models/Motorcycle');

// @desc    Obtener todas las motos aprobadas
// @route   GET /api/products
// @access  Public
const getMotorcycles = async (req, res) => {
  try {
    // Por ahora, obtenemos solo las que están aprobadas para el público
    const motorcycles = await Motorcycle.find({ status: 'aprobado' });
    res.json(motorcycles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};

const createMotorcycle = async (req, res) => {
  try {
    const {
      name, price, image, additionalImages, category, year, cc,
      mileage, condition, transmission, fuel, description,
      location, negotiable, features, included
    } = req.body;

    const motorcycle = new Motorcycle({
      name,
      price,
      image,
      additionalImages,
      category,
      year,
      cc,
      mileage,
      condition,
      transmission,
      fuel,
      description,
      location,
      negotiable,
      features,
      included,
      seller: req.user._id, // Asignar el vendedor logueado
    });

    const createdMotorcycle = await motorcycle.save();
    res.status(201).json(createdMotorcycle);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};


const getMyMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({ seller: req.user._id });
    res.json(motorcycles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};


const getMotorcycleById = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findById(req.params.id).populate('seller', 'name email');
    if (motorcycle) {
      // Solo mostrar si está aprobado, o si el que pregunta es el vendedor o un admin
      if (motorcycle.status === 'aprobado' || (req.user && (req.user._id.equals(motorcycle.seller._id) || req.user.role === 'admin'))) {
        res.json(motorcycle);
      } else {
        res.status(403).json({ msg: 'No autorizado para ver esta moto' });
      }
    } else {
      res.status(404).json({ msg: 'Motocicleta no encontrada' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};

const createMotorcycleReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;

  try {
    const motorcycle = await Motorcycle.findById(id);

    if (!motorcycle) {
      return res.status(404).json({ msg: 'Motocicleta no encontrada' });
    }

    // Verificar si el usuario ya ha comentado
    const alreadyReviewed = motorcycle.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ msg: 'Ya has comentado en esta moto' });
    }

    const review = {
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      comment,
    };

    motorcycle.reviews.push(review);

    motorcycle.averageRating =
      motorcycle.reviews.reduce((acc, item) => item.rating + acc, 0) /
      motorcycle.reviews.length;

    await motorcycle.save();
    res.status(201).json({ msg: 'Reseña añadida' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};

// ... aquí irán más funciones del controlador (get by id, create, etc)

module.exports = {
  getMotorcycles,
  createMotorcycle,
  getMyMotorcycles,
  getMotorcycleById,
  createMotorcycleReview,
};
