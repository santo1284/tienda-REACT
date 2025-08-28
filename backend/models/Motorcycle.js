// models/Motorcycle.js
const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const motorcycleSchema = mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1,
  },
  cc: {
    type: Number,
    required: true,
    min: 50,
  },
  category: {
    type: String,
    required: true,
    enum: ['Deportivas', 'Naked', 'Touring', 'Scooter', 'Enduro', 'Cruiser', 'Urbana'],
    default: 'Urbana',
  },
  condition: {
    type: String,
    required: true,
    enum: ['Excelente', 'Muy bueno', 'Bueno', 'Regular'],
    default: 'Bueno',
  },
  mileage: {
    type: Number,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    default: 'Garzón, Huila',
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  }],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  // NUEVO CAMPO: availability
  availability: {
    type: String,
    required: true,
    enum: ['available', 'sold', 'reserved', 'maintenance'],
    default: 'available',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Motorcycle', motorcycleSchema);