const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const motorcycleSchema = mongoose.Schema({
  // Información del vendedor
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  
  // Información básica
  name: {
    type: String,
    required: [true, 'El título es obligatorio']
  },
  brand: {
    type: String,
    required: [true, 'La marca es obligatoria']
  },
  model: {
    type: String,
    required: [true, 'El modelo es obligatorio']
  },
  
  // Detalles técnicos
  year: {
    type: Number,
    required: [true, 'El año es obligatorio'],
    min: [1990, 'El año debe ser mayor a 1990'],
    max: [new Date().getFullYear() + 1, 'El año no puede ser futuro']
  },
  cc: {
    type: Number,
    required: [true, 'El cilindraje es obligatorio'],
    min: [50, 'El cilindraje debe ser mayor a 50cc']
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: ['Deportivas', 'Naked', 'Scooter', 'Enduro', 'Adventure', 'Street', 'Touring', 'Urbana']
  },
  condition: {
    type: String,
    required: [true, 'El estado es obligatorio'],
    enum: ['Excelente', 'Muy Bueno', 'Bueno', 'Regular', 'Para Reparar'],
    default: 'Bueno'
  },
  mileage: {
    type: Number,
    min: [0, 'El kilometraje no puede ser negativo']
  },
  
  // Precio y ubicación
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [50000, 'El precio debe ser mayor a $50.000']
  },
  location: {
    type: String,
    required: [true, 'La ubicación es obligatoria'],
    default: 'Garzón, Huila'
  },
  
  // Descripción
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    minLength: [50, 'La descripción debe tener al menos 50 caracteres']
  },
  
  // Imágenes
  images: [{
    url: {
      type: String,
      required: true
    },
    public_id: String // Para Cloudinary
  }],
  
  // Estado de la publicación
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold'],
    default: 'pending'
  },
  
  // Reseñas
  reviews: [reviewSchema],
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  
  // Información adicional
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índices para mejor rendimiento
motorcycleSchema.index({ seller: 1 });
motorcycleSchema.index({ status: 1 });
motorcycleSchema.index({ category: 1 });
motorcycleSchema.index({ price: 1 });
motorcycleSchema.index({ year: 1 });
motorcycleSchema.index({ createdAt: -1 });

// Virtual para el ID sin guion bajo
motorcycleSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Asegurar que los virtuals se incluyan cuando se convierta a JSON
motorcycleSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Motorcycle', motorcycleSchema);