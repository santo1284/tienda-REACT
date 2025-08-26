import React, { useState, useEffect, FormEvent } from 'react';
import api from '../utils/api';

// --- Interfaces ---
interface Motorcycle {
  _id: string;
  name: string;
  price: number;
  status: string;
  seller: { name: string; email: string; };
  createdAt: string;
}

interface Rental {
    _id: string;
    name: string;
    pricePerDay: number;
    isAvailable: boolean;
    image: string;
    description: string;
    cc: number;
    category: string;
}

const initialRentalFormState = {
    _id: '',
    name: '',
    pricePerDay: 0,
    isAvailable: true,
    image: 'https://via.placeholder.com/300x200.png?text=Moto+Alquiler',
    description: '',
    cc: 150,
    category: 'Scooter',
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('approvals');
  const [pending, setPending] = useState<Motorcycle[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for rental form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rentalForm, setRentalForm] = useState(initialRentalFormState);
  const [isEditing, setIsEditing] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const [pendingRes, rentalsRes] = await Promise.all([
                api.get('/admin/motorcycles/pending'),
                api.get('/admin/rentals')
            ]);
            setPending(pendingRes.data);
            setRentals(rentalsRes.data);
        } catch (err) {
            setError('No se pudieron cargar los datos del panel de administrador.');
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  // --- Handlers for Approvals ---
  const handleStatusUpdate = async (id: string, status: string, notes?: string) => {
    try {
        await api.put(`/admin/motorcycles/${id}/status`, { status, adminNotes: notes });
        setPending(pending.filter(moto => moto._id !== id));
    } catch (err) {
        setError('Error al actualizar el estado.');
    }
  };

  // --- Handlers for Rentals ---
  const handleRentalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // @ts-ignore
    const val = isCheckbox ? e.target.checked : value;
    setRentalForm(prev => ({ ...prev, [name]: val }));
  };

  const handleRentalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const apiCall = isEditing
        ? api.put(`/admin/rentals/${rentalForm._id}`, rentalForm)
        : api.post('/admin/rentals', rentalForm);

    try {
        const { data } = await apiCall;
        if (isEditing) {
            setRentals(rentals.map(r => r._id === data._id ? data : r));
        } else {
            setRentals([...rentals, data]);
        }
        closeModal();
    } catch (err) {
        setError('Error al guardar la moto de alquiler.');
    }
  };

  const openModalForEdit = (rental: Rental) => {
    setIsEditing(true);
    setRentalForm(rental);
    setIsModalOpen(true);
  };

  const openModalForCreate = () => {
    setIsEditing(false);
    setRentalForm(initialRentalFormState);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteRental = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta moto de alquiler?')) {
        try {
            await api.delete(`/admin/rentals/${id}`);
            setRentals(rentals.filter(r => r._id !== id));
        } catch (err) {
            setError('Error al eliminar la moto de alquiler.');
        }
    }
  };


  // --- Render Logic ---
  if (loading) return <div>Cargando panel de administrador...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('approvals')} className={`${activeTab === 'approvals' ? 'border-lime-500 text-lime-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Aprobaciones
          </button>
          <button onClick={() => setActiveTab('rentals')} className={`${activeTab === 'rentals' ? 'border-lime-500 text-lime-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Gestión de Alquileres
          </button>
        </nav>
      </div>

      {/* Approvals Tab Content */}
      {activeTab === 'approvals' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Motos Pendientes de Aprobación</h2>
          {pending.length === 0 ? <p>No hay motocicletas pendientes de revisión.</p> : (
            <div className="space-y-4">
              {pending.map((moto) => (
                <div key={moto._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">{moto.name}</p>
                    <p>Vendedor: {moto.seller.name} ({moto.seller.email})</p>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleStatusUpdate(moto._id, 'aprobado')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Aprobar</button>
                    <button onClick={() => { const notes = prompt('Introduce las notas para el vendedor:'); if(notes) handleStatusUpdate(moto._id, 'requiere cambios', notes); }} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Cambios</button>
                    <button onClick={() => handleStatusUpdate(moto._id, 'rechazado')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Rechazar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Rentals Tab Content */}
      {activeTab === 'rentals' && (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Gestionar Motos de Alquiler</h2>
                <button onClick={openModalForCreate} className="bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700">Añadir Moto</button>
            </div>
            <div className="space-y-4">
                {rentals.map((rental) => (
                    <div key={rental._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img src={rental.image} alt={rental.name} className="w-24 h-16 object-cover rounded"/>
                            <div>
                                <p className="font-bold">{rental.name}</p>
                                <p>${rental.pricePerDay.toLocaleString('es-CO')} / día</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rental.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {rental.isAvailable ? 'Disponible' : 'No Disponible'}
                            </span>
                            <button onClick={() => openModalForEdit(rental)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Editar</button>
                            <button onClick={() => handleDeleteRental(rental._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Rental Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Moto de Alquiler' : 'Añadir Moto de Alquiler'}</h2>
            <form onSubmit={handleRentalSubmit} className="space-y-4">
                <input type="text" name="name" value={rentalForm.name} onChange={handleRentalFormChange} placeholder="Nombre de la moto" required className="w-full p-2 border rounded"/>
                <textarea name="description" value={rentalForm.description} onChange={handleRentalFormChange} placeholder="Descripción" required className="w-full p-2 border rounded"></textarea>
                <input type="number" name="pricePerDay" value={rentalForm.pricePerDay} onChange={handleRentalFormChange} placeholder="Precio por día" required className="w-full p-2 border rounded"/>
                <input type="number" name="cc" value={rentalForm.cc} onChange={handleRentalFormChange} placeholder="Cilindraje" required className="w-full p-2 border rounded"/>
                <input type="text" name="category" value={rentalForm.category} onChange={handleRentalFormChange} placeholder="Categoría" required className="w-full p-2 border rounded"/>
                <input type="text" name="image" value={rentalForm.image} onChange={handleRentalFormChange} placeholder="URL de la imagen" required className="w-full p-2 border rounded"/>
                <div className="flex items-center">
                    <input type="checkbox" name="isAvailable" checked={rentalForm.isAvailable} onChange={handleRentalFormChange} id="isAvailable" className="h-4 w-4 text-lime-600 border-gray-300 rounded"/>
                    <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">Disponible</label>
                </div>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={closeModal} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
                    <button type="submit" className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700">{isEditing ? 'Guardar Cambios' : 'Crear'}</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
