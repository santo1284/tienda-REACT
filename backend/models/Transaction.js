const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  // Usuario que realiza la transacción
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  // Artículo transaccionado (puede ser una moto en venta o en alquiler)
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // La referencia es dinámica, puede apuntar a 'Motorcycle' o 'Rental'
    refPath: 'itemTypeModel'
  },

  // Campo que le dice a Mongoose a qué modelo debe apuntar 'item'
  itemTypeModel: {
    type: String,
    required: true,
    enum: ['Motorcycle', 'Rental']
  },

  // Para mostrar fácilmente en el panel de admin
  itemModelName: {
    type: String,
    required: true,
  },

  // Tipo de transacción
  transactionType: {
    type: String,
    required: true,
    enum: ['Venta', 'Alquiler']
  },

  // Monto pagado o depositado
  amountPaid: {
    type: Number,
    required: true
  },

  // Estado de la transacción
  status: {
    type: String,
    required: true,
    enum: ['pendiente_validacion', 'completada', 'cancelada'],
    default: 'pendiente_validacion'
  },

  // Snapshot del número de contacto del usuario para fácil acceso
  userContact: {
    type: String,
    required: true
  },

  // Notas del administrador
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Índices para optimizar búsquedas
transactionSchema.index({ status: 1 });
transactionSchema.index({ createdAt: -1 });

// Virtual para el ID
transactionSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

transactionSchema.set('toJSON', {
  virtuals: true
});

// Corrección para que refPath funcione con los nombres de modelo correctos
// El enum de itemTypeModel debe coincidir con los nombres de modelo que usa Mongoose
// Por defecto, Mongoose pluraliza los nombres, pero si se define explícitamente, usa ese.
// Asumimos que los modelos se registraron como 'Motorcycle' y 'Rental'.

module.exports = mongoose.model('Transaction', transactionSchema);
