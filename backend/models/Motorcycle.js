const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: { // Denormalized for easy display
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
  },
}, {
  timestamps: true
});

const motorcycleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  additionalImages: [String],
  category: { type: String, required: true },
  year: { type: Number, required: true },
  cc: { type: Number, required: true },
  mileage: { type: Number, default: 0 },
  condition: { type: String, enum: ['Nueva', 'Seminueva', 'Usada'], required: true },
  transmission: { type: String, required: true },
  fuel: { type: String, required: true },
  description: { type: String, required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  availability: { type: String, default: 'Disponible' },
  reservationPrice: { type: Number },
  features: [String],
  included: [String],
  reviews: [reviewSchema], // Embedded reviews
  averageRating: { type: Number, default: 0 },
  location: { type: String, required: true },
  negotiable: { type: Boolean, default: true },

  // New fields for approval workflow
  status: {
    type: String,
    enum: ['en revisión', 'aprobado', 'rechazado', 'requiere cambios'],
    default: 'en revisión'
  },
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
});

const Motorcycle = mongoose.model('Motorcycle', motorcycleSchema);

module.exports = Motorcycle;
