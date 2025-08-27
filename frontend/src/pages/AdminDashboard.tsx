import React, { useState, useEffect, FormEvent } from 'react';
import api from '../utils/api';

// --- Interfaces ---
interface Motorcycle {
  _id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  cc: number;
  category: string;
  condition: string;
  mileage: number;
  price: number;
  location: string;
  description: string;
  images: Array<{ url: string; public_id?: string }>;
  status: string;
  seller: { name: string; email: string; };
  createdAt: string;
  views?: number;
  rating?: number;
  numReviews?: number;
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
  const [selectedMoto, setSelectedMoto] = useState<Motorcycle | null>(null);

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
        console.log('Actualizando moto:', id, 'a estado:', status); // Debug
        
        const payload: any = { status };
        if (notes && notes.trim() !== '') {
          payload.adminNotes = notes.trim();
        }
        
        await api.put(`/admin/motorcycles/${id}/status`, payload);
        setPending(pending.filter(moto => moto._id !== id));
        setSelectedMoto(null); // Cerrar modal si está abierto
        
        // Mostrar mensaje de éxito
        alert(`Motocicleta ${status === 'approved' ? 'aprobada' : status === 'rejected' ? 'rechazada' : 'actualizada'} exitosamente`);
    } catch (err: any) {
        console.error('Error al actualizar estado:', err);
        
        // Mostrar error específico
        const errorMessage = err.response?.data?.msg || err.response?.data?.message || 'Error al actualizar el estado';
        setError(errorMessage);
        
        // Limpiar error después de 5 segundos
        setTimeout(() => setError(''), 5000);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
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
            Aprobaciones ({pending.length})
          </button>
          <button onClick={() => setActiveTab('rentals')} className={`${activeTab === 'rentals' ? 'border-lime-500 text-lime-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
            Gestión de Alquileres ({rentals.length})
          </button>
        </nav>
      </div>

      {/* Approvals Tab Content */}
      {activeTab === 'approvals' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Motos Pendientes de Aprobación</h2>
          {pending.length === 0 ? <p className="text-gray-600 text-center py-8">No hay motocicletas pendientes de revisión.</p> : (
            <div className="grid gap-6">
              {pending.map((moto) => (
                <div key={moto._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Header Card */}
                  <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{moto.name}</h3>
                      <p className="text-sm text-gray-600">
                        Vendedor: <span className="font-medium">{moto.seller.name}</span> ({moto.seller.email})
                      </p>
                      <p className="text-xs text-gray-500">
                        Publicado: {new Date(moto.createdAt).toLocaleDateString('es-CO')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedMoto(moto)} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Image Preview */}
                      <div className="md:col-span-1">
                        {moto.images && moto.images.length > 0 ? (
                          <img 
                            src={moto.images[0].url} 
                            alt={moto.name}
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              if (e.currentTarget.nextElementSibling) {
                                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div className={`w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center ${moto.images && moto.images.length > 0 ? 'hidden' : ''}`}>
                          <div className="text-center text-gray-500">
                            <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">Sin imagen</span>
                          </div>
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div className="md:col-span-2 space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Marca:</span>
                            <p className="text-gray-900">{moto.brand}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Modelo:</span>
                            <p className="text-gray-900">{moto.model}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Año:</span>
                            <p className="text-gray-900">{moto.year}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Cilindraje:</span>
                            <p className="text-gray-900">{moto.cc} cc</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Categoría:</span>
                            <p className="text-gray-900">{moto.category}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Estado:</span>
                            <p className="text-gray-900">{moto.condition}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t">
                          <div>
                            <span className="text-2xl font-bold text-green-600">{formatPrice(moto.price)}</span>
                            <p className="text-sm text-gray-600">{moto.location}</p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleStatusUpdate(moto._id, 'approved')} 
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                            >
                              ✓ Aprobar
                            </button>
                            <button 
                              onClick={() => { 
                                const notes = prompt('Introduce las notas para el vendedor:'); 
                                if(notes) handleStatusUpdate(moto._id, 'pending', notes); 
                              }} 
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                            >
                              ⚠ Revisar
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(moto._id, 'rejected')} 
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                            >
                              ✗ Rechazar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

      {/* Detailed Motorcycle Modal */}
      {selectedMoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedMoto.name}</h2>
              <button 
                onClick={() => setSelectedMoto(null)} 
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              {/* Images Gallery */}
              {selectedMoto.images && selectedMoto.images.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Imágenes ({selectedMoto.images.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedMoto.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={image.url} 
                          alt={`${selectedMoto.name} - ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.nextElementSibling) {
                              (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                            }
                          }}
                        />
                        <div className="hidden absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <svg className="mx-auto h-8 w-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs">Error al cargar</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Información General</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Marca:</span>
                        <span>{selectedMoto.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Modelo:</span>
                        <span>{selectedMoto.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Año:</span>
                        <span>{selectedMoto.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Cilindraje:</span>
                        <span>{selectedMoto.cc} cc</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Categoría:</span>
                        <span>{selectedMoto.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Estado:</span>
                        <span>{selectedMoto.condition}</span>
                      </div>
                      {selectedMoto.mileage && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Kilometraje:</span>
                          <span>{selectedMoto.mileage.toLocaleString('es-CO')} km</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Precio y Ubicación</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Precio:</span>
                        <span className="text-xl font-bold text-green-600">{formatPrice(selectedMoto.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Ubicación:</span>
                        <span>{selectedMoto.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Vistas:</span>
                        <span>{selectedMoto.views || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Vendedor</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Nombre:</span>
                        <span>{selectedMoto.seller.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Email:</span>
                        <span>{selectedMoto.seller.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedMoto.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button 
                  onClick={() => handleStatusUpdate(selectedMoto._id, 'approved')} 
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                >
                  ✓ Aprobar Motocicleta
                </button>
                <button 
                  onClick={() => { 
                    const notes = prompt('Introduce las notas para el vendedor:'); 
                    if(notes) handleStatusUpdate(selectedMoto._id, 'pending', notes); 
                  }} 
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
                >
                  ⚠ Requiere Cambios
                </button>
                <button 
                  onClick={() => handleStatusUpdate(selectedMoto._id, 'rejected')} 
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  ✗ Rechazar
                </button>
              </div>
            </div>
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