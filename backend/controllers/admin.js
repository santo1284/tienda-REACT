const Motorcycle = require('../models/Motorcycle');
const Rental = require('../models/Rental');

// @desc    Obtener todas las motos pendientes de revisión
// @route   GET /api/admin/motorcycles/pending
// @access  Private/Admin
const getPendingMotorcycles = async (req, res) => {
  try {
    const pendingMotorcycles = await Motorcycle.find({ status: 'en revisión' }).populate('seller', 'name email');
    res.json(pendingMotorcycles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};

// @desc    Actualizar el estado de una moto
// @route   PUT /api/admin/motorcycles/:id/status
// @access  Private/Admin
const updateMotorcycleStatus = async (req, res) => {
  const { status, adminNotes } = req.body;
  const { id } = req.params;

  // Validación básica del estado
  const validStatuses = ['aprobado', 'rechazado', 'requiere cambios'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ msg: 'Estado no válido' });
  }

  try {
    const motorcycle = await Motorcycle.findById(id);

    if (!motorcycle) {
      return res.status(404).json({ msg: 'Motocicleta no encontrada' });
    }

    motorcycle.status = status;
    if (adminNotes) {
      motorcycle.adminNotes = adminNotes;
    } else {
        motorcycle.adminNotes = ''; // Limpiar notas si no se envían
    }

    const updatedMotorcycle = await motorcycle.save();
    res.json(updatedMotorcycle);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del Servidor');
  }
};

// RENTAL MANAGEMENT
const createRental = async (req, res) => {
    try {
        const rental = new Rental(req.body);
        const createdRental = await rental.save();
        res.status(201).json(createdRental);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear alquiler', error: error.message });
    }
};

const getRentals = async (req, res) => {
    try {
        const rentals = await Rental.find({});
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener alquileres', error: error.message });
    }
};

const updateRental = async (req, res) => {
    try {
        const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!rental) {
            return res.status(404).json({ message: 'Alquiler no encontrado' });
        }
        res.json(rental);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar alquiler', error: error.message });
    }
};

const deleteRental = async (req, res) => {
    try {
        const rental = await Rental.findByIdAndDelete(req.params.id);
        if (!rental) {
            return res.status(404).json({ message: 'Alquiler no encontrado' });
        }
        res.json({ message: 'Alquiler eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar alquiler', error: error.message });
    }
};

module.exports = {
  getPendingMotorcycles,
  updateMotorcycleStatus,
  createRental,
  getRentals,
  updateRental,
  deleteRental,
};
