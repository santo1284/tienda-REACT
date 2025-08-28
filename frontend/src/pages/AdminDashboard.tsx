import React, { useState, useEffect, FormEvent } from 'react';
import api from '../utils/api';
import { Product } from '../types/Product';

// --- Interfaces ---
interface Rental extends Product {}

interface Transaction {
  _id: string;
  user: { name: string; email: string; phone: string; };
  item: Product;
  itemModelName: string;
  transactionType: 'Venta' | 'Alquiler';
  amountPaid: number;
  status: 'pendiente_validacion' | 'completada' | 'cancelada';
  createdAt: string;
}

const initialRentalFormState: Partial<Rental> = {
  name: 'Moto de Alquiler',
  model: '',
  brand: 'N/A',
  description: '',
  price: 0,
  cc: 150,
  category: 'Urbana',
  condition: 'Bueno',
  contactNumber: '3001234567',
  availability: 'available',
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('approvals');
  const [pending, setPending] = useState<Product[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMoto, setSelectedMoto] = useState<Product | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rentalForm, setRentalForm] = useState<Partial<Rental>>(initialRentalFormState);
  const [rentalImageFile, setRentalImageFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [pendingRes, rentalsRes, transactionsRes] = await Promise.all([
          api.get('/admin/motorcycles/pending'),
          api.get('/admin/rentals'),
          api.get('/admin/transactions')
        ]);
        setPending(pendingRes.data);
        setRentals(rentalsRes.data);
        setTransactions(transactionsRes.data);
      } catch (err) {
        setError('No se pudieron cargar los datos del panel de administrador.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await api.put(`/admin/motorcycles/${id}/status`, { status });
      setPending(pending.filter(moto => moto.id.toString() !== id));
      setSelectedMoto(null);
      alert(`Motocicleta ${status === 'approved' ? 'aprobada' : 'rechazada'}.`);
    } catch (err) {
      setError('Error al actualizar el estado.');
    }
  };

  const handleRentalFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRentalForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRentalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRentalImageFile(e.target.files[0]);
    }
  };

  const handleRentalSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dataToSend = new FormData();
    // Append all form fields
    for (const key in rentalForm) {
        // @ts-ignore
        dataToSend.append(key, rentalForm[key]);
    }

    if (rentalImageFile) {
        dataToSend.append('image', rentalImageFile);
    }

    // Asignar price a pricePerDay para el backend si es necesario
    if (rentalForm.price) {
        dataToSend.set('pricePerDay', rentalForm.price.toString());
    }

    try {
        let response;
        if (isEditing) {
            response = await api.put(`/admin/rentals/${rentalForm.id}`, dataToSend);
        } else {
            response = await api.post('/admin/rentals', dataToSend);
        }

        const updatedRental = response.data;
        if (isEditing) {
            setRentals(rentals.map(r => r.id === updatedRental.id ? updatedRental : r));
        } else {
            setRentals([...rentals, updatedRental]);
        }
        closeModal();
    } catch (err) {
        setError('Error al guardar la moto de alquiler.');
        console.error(err);
    }
  };

  const openModalForEdit = (rental: Rental) => {
    setIsEditing(true);
    setRentalForm(rental);
    setRentalImageFile(null);
    setIsModalOpen(true);
  };

  const openModalForCreate = () => {
    setIsEditing(false);
    setRentalForm(initialRentalFormState);
    setRentalImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // ✅ Nueva función para cerrar el modal de detalles
  const closeDetailsModal = () => setSelectedMoto(null);

  const handleDeleteRental = async (id: number) => {
    if (window.confirm('¿Estás seguro?')) {
        try {
            await api.delete(`/admin/rentals/${id}`);
            setRentals(rentals.filter(r => r.id !== id));
        } catch (err) {
            setError('Error al eliminar la moto de alquiler.');
        }
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('approvals')} className={`${activeTab === 'approvals' ? 'border-lime-500 text-lime-600' : 'border-transparent text-gray-500 hover:text-gray-700'} py-4 px-1 border-b-2 font-medium text-sm`}>
            Propuestas de Venta ({pending.length})
          </button>
          <button onClick={() => setActiveTab('rentals')} className={`${activeTab === 'rentals' ? 'border-lime-500 text-lime-600' : 'border-transparent text-gray-500 hover:text-gray-700'} py-4 px-1 border-b-2 font-medium text-sm`}>
            Gestión de Alquileres ({rentals.length})
          </button>
          <button onClick={() => setActiveTab('transactions')} className={`${activeTab === 'transactions' ? 'border-lime-500 text-lime-600' : 'border-transparent text-gray-500 hover:text-gray-700'} py-4 px-1 border-b-2 font-medium text-sm`}>
            Transacciones ({transactions.length})
          </button>
        </nav>
      </div>

      {activeTab === 'approvals' && (
        <div className="space-y-4">
            {pending.length > 0 ? pending.map(moto => (
                <div key={moto.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                    <div>
                        <p className="font-bold">{moto.name}</p>
                        <p className="text-sm text-gray-600">{moto.seller?.name} - {formatPrice(moto.price)}</p>
                    </div>
                    <div>
                        <button onClick={() => setSelectedMoto(moto)} className="text-blue-500 hover:underline mr-4">Ver Detalles</button>
                        <button onClick={() => handleStatusUpdate(moto.id.toString(), 'approved')} className="text-green-500 hover:underline mr-4">Aprobar</button>
                        <button onClick={() => handleStatusUpdate(moto.id.toString(), 'rejected')} className="text-red-500 hover:underline">Rechazar</button>
                    </div>
                </div>
            )) : <p>No hay propuestas pendientes.</p>}
        </div>
      )}

      {activeTab === 'rentals' && (
         <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Motos de Alquiler</h2>
                <button onClick={openModalForCreate} className="bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700">Añadir Moto</button>
            </div>
            <div className="space-y-4">
                {rentals.map((rental) => (
                    <div key={rental.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                        <p className="font-bold">{rental.model}</p>
                        <div>
                            <button onClick={() => openModalForEdit(rental)} className="text-blue-500 hover:underline mr-4">Editar</button>
                            <button onClick={() => handleDeleteRental(rental.id)} className="text-red-500 hover:underline">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Últimas Transacciones</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left p-2">Fecha</th><th className="text-left p-2">Cliente</th><th className="text-left p-2">Contacto</th><th className="text-left p-2">Artículo</th><th className="text-left p-2">Tipo</th><th className="text-left p-2">Monto</th><th className="text-left p-2">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx._id} className="border-b">
                                <td className="p-2">{new Date(tx.createdAt).toLocaleString('es-CO')}</td><td className="p-2">{tx.user.name}</td><td className="p-2">{tx.user.phone}</td><td className="p-2">{tx.itemModelName}</td><td className="p-2">{tx.transactionType}</td><td className="p-2">{formatPrice(tx.amountPaid)}</td>
                                <td className="p-2">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tx.status === 'completada' ? 'bg-green-100 text-green-800' : tx.status === 'pendiente_validacion' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {tx.status.replace('_', ' ')}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* ✅ Modal de detalles de la moto seleccionada */}
      {selectedMoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Detalles de la Motocicleta</h2>
              <button 
                onClick={closeDetailsModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {selectedMoto.images && selectedMoto.images.length > 0 && (
                <div className="mb-4">
                  <img 
                    src={selectedMoto.images[0].url} 
                    alt={selectedMoto.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Información General</h3>
                  <p><strong>Nombre:</strong> {selectedMoto.name}</p>
                  <p><strong>Modelo:</strong> {selectedMoto.model}</p>
                  <p><strong>Marca:</strong> {selectedMoto.brand}</p>
                  <p><strong>Precio:</strong> {formatPrice(selectedMoto.price)}</p>
                  <p><strong>Categoría:</strong> {selectedMoto.category}</p>
                  <p><strong>Condición:</strong> {selectedMoto.condition}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700">Especificaciones</h3>
                  <p><strong>Cilindraje:</strong> {selectedMoto.cc} cc</p>
                  <p><strong>Kilómetros:</strong> {selectedMoto.km || 'No especificado'} km</p>
                  <p><strong>Año:</strong> {selectedMoto.year || 'No especificado'}</p>
                  <p><strong>Disponibilidad:</strong> {selectedMoto.availability}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-700">Descripción</h3>
                <p className="text-gray-600 mt-1">{selectedMoto.description}</p>
              </div>
              
              {selectedMoto.seller && (
                <div>
                  <h3 className="font-semibold text-gray-700">Información del Vendedor</h3>
                  <p><strong>Nombre:</strong> {selectedMoto.seller.name}</p>
                  <p><strong>Email:</strong> {selectedMoto.seller.email}</p>
                  <p><strong>Teléfono:</strong> {selectedMoto.contactNumber}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  onClick={closeDetailsModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cerrar
                </button>
                <button 
                  onClick={() => handleStatusUpdate(selectedMoto.id.toString(), 'approved')} 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Aprobar
                </button>
                <button 
                  onClick={() => handleStatusUpdate(selectedMoto.id.toString(), 'rejected')} 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear/editar alquiler */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Moto de Alquiler' : 'Añadir Moto de Alquiler'}</h2>
            <form onSubmit={handleRentalSubmit} className="space-y-4">
                <input type="text" name="model" value={rentalForm.model || ''} onChange={handleRentalFormChange} placeholder="Modelo" required className="w-full p-2 border rounded"/>
                <textarea name="description" value={rentalForm.description || ''} onChange={handleRentalFormChange} placeholder="Descripción" required className="w-full p-2 border rounded"></textarea>
                <input type="number" name="price" value={rentalForm.price || 0} onChange={handleRentalFormChange} placeholder="Precio por día" required className="w-full p-2 border rounded"/>
                <input type="number" name="pricePerHour" value={rentalForm.pricePerHour || 0} onChange={handleRentalFormChange} placeholder="Precio por hora" className="w-full p-2 border rounded"/>
                <input type="number" name="cc" value={rentalForm.cc || 150} onChange={handleRentalFormChange} placeholder="Cilindraje" required className="w-full p-2 border rounded"/>
                <select name="condition" value={rentalForm.condition || 'Bueno'} onChange={handleRentalFormChange} className="w-full p-2 border rounded">
                    <option>Excelente</option><option>Muy Bueno</option><option>Bueno</option><option>Regular</option>
                </select>
                <input type="text" name="contactNumber" value={rentalForm.contactNumber || ''} onChange={handleRentalFormChange} placeholder="Número de Contacto" required className="w-full p-2 border rounded"/>
                <input type="file" name="image" onChange={handleRentalImageChange} className="w-full p-2 border rounded"/>

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