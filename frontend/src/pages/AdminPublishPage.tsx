import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../types/Product';
import api from '../utils/api';
import { 
  Camera, Upload, X, Plus, Edit, Eye, Settings,
  CheckCircle, XCircle, Clock, AlertTriangle
} from 'lucide-react';

const AdminPublishPage: React.FC = () => {
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  
  // Estados para el formulario
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear().toString(),
    cc: '',
    price: '',
    description: '',
    category: 'Deportivas',
    condition: 'Excelente',
    mileage: '',
    location: 'Garzón, Huila',
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados para la gestión de motos
  const [activeTab, setActiveTab] = useState<'publish' | 'manage'>('manage');
  const [motorcycles, setMotorcycles] = useState<Product[]>([]);
  const [loadingMotorcycles, setLoadingMotorcycles] = useState(false);
  const [updatingAvailability, setUpdatingAvailability] = useState<string | null>(null);

  // Cargar motos al inicializar
  useEffect(() => {
    if (activeTab === 'manage') {
      fetchAllMotorcycles();
    }
  }, [activeTab]);

 const fetchAllMotorcycles = async () => {
    try {
      setLoadingMotorcycles(true);
      // Obtener todas las motos (no solo las aprobadas)
      const response = await api.get('/admin/motorcycles/all');
      
      // Mapear los datos del backend al formato Product
      const rawMotorcycles = response.data.motorcycles || response.data;
      const mappedMotorcycles: Product[] = rawMotorcycles.map((motorcycle: any) => ({
        id: motorcycle._id || motorcycle.id,
        name: motorcycle.name,
        price: motorcycle.price,
        category: motorcycle.category,
        image: motorcycle.images?.[0]?.url || motorcycle.image || '/images/placeholder.png',
        brand: motorcycle.brand,
        model: motorcycle.model,
        year: motorcycle.year,
        cc: motorcycle.cc,
        condition: motorcycle.condition,
        mileage: motorcycle.mileage,
        km: motorcycle.mileage?.toString() || '0',
        location: motorcycle.location,
        description: motorcycle.description,
        images: motorcycle.images,
        seller: motorcycle.seller,
        rating: motorcycle.rating || 0,
        numReviews: motorcycle.numReviews || 0,
        status: motorcycle.status,
        availability: motorcycle.availability || 'available'
      }));
      
      setMotorcycles(mappedMotorcycles);
    } catch (err: any) {
      console.error('Error al obtener motos:', err);
      setError('Error al cargar las motocicletas');
    } finally {
      setLoadingMotorcycles(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Solo se permiten archivos de imagen');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setError('La imagen debe ser menor a 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!image) {
      setError('Debes subir una imagen de la moto.');
      setLoading(false);
      return;
    }

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });
    dataToSend.append('image', image);

    try {
      const response = await api.post('/admin/products', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccess('Moto publicada exitosamente!');
        // Limpiar formulario
        setFormData({
          name: '',
          brand: '',
          model: '',
          year: new Date().getFullYear().toString(),
          cc: '',
          price: '',
          description: '',
          category: 'Deportivas',
          condition: 'Excelente',
          mileage: '',
          location: 'Garzón, Huila',
        });
        removeImage();
        
        // Actualizar lista si estamos en la pestaña de gestión
        if (activeTab === 'manage') {
          fetchAllMotorcycles();
        }
        
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Error al publicar la moto.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error de conexión o del servidor. Intenta de nuevo.');
      console.error('Error en handleSubmit:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAvailabilityChange = async (motorcycleId: string, newAvailability: string) => {
    try {
      setUpdatingAvailability(motorcycleId);
      await api.put(`/admin/motorcycles/${motorcycleId}/availability`, {
        availability: newAvailability
      });
      
      // Actualizar el estado local
      setMotorcycles(prev => 
        prev.map(moto => 
          moto.id === parseInt(motorcycleId) 
            ? { ...moto, availability: newAvailability as any }
            : moto
        )
      );
      
      setSuccess('Disponibilidad actualizada correctamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar disponibilidad');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUpdatingAvailability(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Aprobado</span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pendiente</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rechazado</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Desconocido</span>;
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Disponible</span>;
      case 'sold':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Vendido</span>;
      case 'reserved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Reservado</span>;
      case 'maintenance':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Mantenimiento</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{availability}</span>;
    }
  };

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP', 
      minimumFractionDigits: 0 
    }).format(price);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Panel de Administrador</h1>
          <p className="text-lg text-gray-600">Gestiona las motocicletas del catálogo</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-2xl shadow-lg">
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'manage'
                  ? 'bg-lime-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Settings className="w-5 h-5 inline mr-2" />
              Gestionar Motos
            </button>
            <button
              onClick={() => setActiveTab('publish')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'publish'
                  ? 'bg-lime-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Publicar Nueva
            </button>
          </div>
        </div>

        {/* Mensajes de estado globales */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {success}
            </div>
          </div>
        )}

        {/* Contenido según la pestaña activa */}
        {activeTab === 'manage' ? (
          <div className="bg-white rounded-2xl shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Motocicletas Registradas</h2>
              <p className="text-gray-600">Gestiona la disponibilidad y estado de las motos</p>
            </div>
            
            <div className="p-6">
              {loadingMotorcycles ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Cargando motocicletas...</p>
                </div>
              ) : motorcycles.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">No hay motocicletas registradas</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Moto</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Precio</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Estado</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Disponibilidad</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {motorcycles.map((motorcycle) => (
                        <tr key={motorcycle.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <img
                                src={motorcycle.image}
                                alt={motorcycle.name}
                                className="w-16 h-16 rounded-lg object-cover mr-4"
                                onError={(e) => {
                                  e.currentTarget.src = '/images/placeholder.png';
                                }}
                              />
                              <div>
                                <p className="font-semibold text-gray-900">{motorcycle.name}</p>
                                <p className="text-sm text-gray-500">{motorcycle.brand} {motorcycle.model} - {motorcycle.year}</p>
                                <p className="text-sm text-gray-500">{motorcycle.cc}cc</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-semibold text-gray-900">{formatPrice(motorcycle.price)}</p>
                          </td>
                          <td className="px-4 py-4">
                            {getStatusBadge(motorcycle.status || 'unknown')}
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-2">
                              {getAvailabilityBadge(motorcycle.availability || 'available')}
                              <select
                                value={motorcycle.availability || 'available'}
                                onChange={(e) => handleAvailabilityChange(motorcycle.id.toString(), e.target.value)}
                                disabled={updatingAvailability === motorcycle.id.toString()}
                                className="block w-full text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-lime-500 disabled:opacity-50"
                              >
                                <option value="available">Disponible</option>
                                <option value="sold">Vendido</option>
                                <option value="reserved">Reservado</option>
                                <option value="maintenance">Mantenimiento</option>
                              </select>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => navigate(`/products/${motorcycle.id}`)}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Ver detalles"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="text-green-600 hover:text-green-800 p-1"
                                title="Editar"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Formulario de publicación */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Imagen */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Foto de la Moto</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-lime-400 transition-colors">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  id="image-upload" 
                  disabled={loading} 
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700">Sube la foto principal</p>
                  <p className="text-gray-500">PNG, JPG hasta 5MB</p>
                </label>
              </div>
              {imagePreview && (
                <div className="relative w-64 mx-auto">
                  <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-xl shadow-lg" />
                  <button 
                    type="button" 
                    onClick={removeImage} 
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Información básica */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Información de la Moto</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título de la publicación *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Ej: Honda CBR 600RR 2020 en excelente estado"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marca *</label>
                  <select 
                    name="brand" 
                    required 
                    value={formData.brand} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  >
                    <option value="">Selecciona la marca</option>
                    <option value="Honda">Honda</option>
                    <option value="Yamaha">Yamaha</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Kawasaki">Kawasaki</option>
                    <option value="BMW">BMW</option>
                    <option value="KTM">KTM</option>
                    <option value="Ducati">Ducati</option>
                    <option value="Harley-Davidson">Harley-Davidson</option>
                    <option value="Bajaj">Bajaj</option>
                    <option value="TVS">TVS</option>
                    <option value="Otra">Otra</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Modelo *</label>
                  <input 
                    type="text" 
                    name="model" 
                    required 
                    value={formData.model} 
                    onChange={handleChange} 
                    placeholder="Ej: CBR 600RR"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Año *</label>
                  <input 
                    type="number" 
                    name="year" 
                    required 
                    min="1980"
                    max={new Date().getFullYear() + 1}
                    value={formData.year} 
                    onChange={handleChange} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cilindraje (cc) *</label>
                  <input 
                    type="number" 
                    name="cc" 
                    required 
                    min="50"
                    value={formData.cc} 
                    onChange={handleChange} 
                    placeholder="Ej: 600"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Precio (COP) *</label>
                  <input 
                    type="number" 
                    name="price" 
                    required 
                    min="0"
                    value={formData.price} 
                    onChange={handleChange} 
                    placeholder="Ej: 15000000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  >
                    <option value="Deportivas">Deportivas</option>
                    <option value="Naked">Naked</option>
                    <option value="Touring">Touring</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Enduro">Enduro</option>
                    <option value="Cruiser">Cruiser</option>
                    <option value="Urbana">Urbana</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condición</label>
                  <select 
                    name="condition" 
                    value={formData.condition} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  >
                    <option value="Excelente">Excelente</option>
                    <option value="Muy bueno">Muy bueno</option>
                    <option value="Bueno">Bueno</option>
                    <option value="Regular">Regular</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kilometraje</label>
                  <input 
                    type="number" 
                    name="mileage" 
                    min="0"
                    value={formData.mileage} 
                    onChange={handleChange} 
                    placeholder="Ej: 25000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    placeholder="Ciudad, Departamento"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
                <textarea 
                  name="description" 
                  required 
                  rows={4}
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Describe las características, estado, modificaciones, etc."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-lime-600 text-white font-bold py-4 px-6 rounded-2xl hover:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg transition-all duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Publicando...
                  </span>
                ) : (
                  'Publicar Moto'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPublishPage;