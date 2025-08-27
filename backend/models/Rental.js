const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  model: {
    type: String,
    required: [true, 'El modelo es obligatorio'],
    trim: true,
  },
  pricePerDay: {
    type: Number,
    required: [true, 'El precio por día es obligatorio'],
  },
  pricePerHour: {
    type: Number,
  },
  image: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
  },
  availability: {
    type: String,
    enum: ['available', 'rented', 'reserved', 'maintenance'],
    default: 'available',
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
  },
  cc: {
    type: Number,
    required: [true, 'El cilindraje es obligatorio'],
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
  },
  condition: {
    type: String,
    required: [true, 'La condición es obligatoria'],
    enum: ['Excelente', 'Muy Bueno', 'Bueno', 'Regular'],
    default: 'Bueno'
  },
  contactNumber: {
    type: String,
    required: [true, 'El número de contacto de la empresa es obligatorio'],
    trim: true,
  }
}, {
  timestamps: true,
});

// Virtual para el ID sin guion bajo
rentalSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Asegurar que los virtuals se incluyan cuando se convierta a JSON
rentalSchema.set('toJSON', {
  virtuals: true
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
