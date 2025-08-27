const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Motorcycle = require('../models/Motorcycle');
const Rental = require('../models/Rental');
const mongoose = require('mongoose');

// @desc    Crear una nueva transacción (reserva o compra)
// @route   POST /api/transactions
// @access  Private
router.post('/', protect, async (req, res) => {
  const {
    itemId,
    itemTypeModel, // 'Motorcycle' o 'Rental'
    amountPaid,
    transactionType // 'Venta' o 'Alquiler'
  } = req.body;

  // --- Validación ---
  if (!itemId || !itemTypeModel || !amountPaid || !transactionType) {
    return res.status(400).json({ message: 'Faltan datos para crear la transacción.' });
  }

  if (!['Motorcycle', 'Rental'].includes(itemTypeModel)) {
    return res.status(400).json({ message: 'Tipo de item no válido.' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const ItemModel = itemTypeModel === 'Motorcycle' ? Motorcycle : Rental;
    const item = await ItemModel.findById(itemId).session(session);

    if (!item) {
      throw new Error('Artículo no encontrado.');
    }

    if (item.availability !== 'available') {
      throw new Error(`Este artículo ya no está disponible. Estado actual: ${item.availability}`);
    }

    // --- Actualizar disponibilidad del artículo ---
    const newAvailability = transactionType === 'Venta' ? 'sold' : 'rented';
    item.availability = newAvailability;
    await item.save({ session });

    // --- Crear la transacción ---
    const transaction = await Transaction.create([{
      user: req.user._id,
      item: item._id,
      itemTypeModel: itemTypeModel,
      itemModelName: item.model || item.name, // 'model' para Rental, 'name' para Motorcycle
      transactionType: transactionType,
      amountPaid: amountPaid,
      userContact: req.user.phone,
      status: 'pendiente_validacion'
    }], { session });

    await session.commitTransaction();

    res.status(201).json({
      message: 'Transacción creada exitosamente. Un asesor se pondrá en contacto contigo.',
      transaction: transaction[0]
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('Error en la transacción:', error);
    res.status(500).json({ message: 'Error al procesar la transacción.', error: error.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
