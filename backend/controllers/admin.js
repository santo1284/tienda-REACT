const Motorcycle = require('../models/Motorcycle');
const Rental = require('../models/Rental');

// @desc    Obtener todas las motos pendientes de revisión
// @route   GET /api/admin/motorcycles/pending
// @access  Private/Admin
const getPendingMotorcycles = async (req, res) => {
  try {
    const pendingMotorcycles = await Motorcycle.find({ status: 'pending' }).populate('seller', 'name email');
    
    console.log('Motos pendientes encontradas:', pendingMotorcycles.length);
    
    res.json(pendingMotorcycles);
  } catch (error) {
    console.error('Error en getPendingMotorcycles:', error.message);
    res.status(500).send('Error del Servidor');
  }
};

// @desc    Actualizar el estado de una moto
// @route   PUT /api/admin/motorcycles/:id/status
// @access  Private/Admin
const updateMotorcycleStatus = async (req, res) => {
  const { status, adminNotes } = req.body;
  const { id } = req.params;

  console.log('Actualizando moto:', id, 'a estado:', status); // Debug

  // Estados válidos según tu modelo Motorcycle.js
  const validStatuses = ['pending', 'approved', 'rejected', 'sold'];
  if (!validStatuses.includes(status)) {
    console.log('Estado inválido recibido:', status); // Debug
    return res.status(400).json({ 
      msg: 'Estado no válido', 
      receivedStatus: status,
      validStatuses: validStatuses 
    });
  }

  try {
    const motorcycle = await Motorcycle.findById(id);

    if (!motorcycle) {
      return res.status(404).json({ msg: 'Motocicleta no encontrada' });
    }

    console.log('Estado anterior:', motorcycle.status); // Debug

    motorcycle.status = status;
    
    // Solo agregar adminNotes si se proporciona
    if (adminNotes && adminNotes.trim() !== '') {
      motorcycle.adminNotes = adminNotes.trim();
    }

    const updatedMotorcycle = await motorcycle.save();
    
    console.log('Moto actualizada exitosamente:', {
      id: updatedMotorcycle._id,
      newStatus: updatedMotorcycle.status,
      adminNotes: updatedMotorcycle.adminNotes || 'Sin notas'
    });
    
    res.json(updatedMotorcycle);
  } catch (error) {
    console.error('Error en updateMotorcycleStatus:', error);
    res.status(500).json({ 
      msg: 'Error del Servidor', 
      error: error.message 
    });
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