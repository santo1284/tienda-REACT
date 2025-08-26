const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
  cc: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
