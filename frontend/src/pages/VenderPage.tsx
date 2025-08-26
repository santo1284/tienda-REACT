import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Upload, X, MapPin, Calendar, Gauge, Tag, DollarSign, FileText } from 'lucide-react';

const VenderPage: React.FC = () => {
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Deportivas',
    year: new Date().getFullYear().toString(),
    cc: '',
    description: '',
    location: 'Garzón, Huila',
    condition: 'Excelente',
    mileage: '',
    brand: '',
    model: ''
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxImages = 5;
    
    if (images.length + files.length > maxImages) {
      setError(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    // Validar tipo y tamaño de archivos
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Solo se permiten archivos de imagen');
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setError('Cada imagen debe ser menor a 5MB');
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setImages(prev => [...prev, ...validFiles]);
      
      // Crear previsualizaciones
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
      
      setError('');
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (motorcycleId: string) => {
    const uploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('motorcycleId', motorcycleId);

      // Aquí harías la llamada a tu API para subir imágenes
      // Por ahora simulo que devuelve una URL
      return `https://api.mimotodelpueblo.com/images/${Date.now()}_${image.name}`;
    });

    try {
      const imageUrls = await Promise.all(uploadPromises);
      return imageUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Error al subir las imágenes');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!authState.user) {
      setError('Debes iniciar sesión para publicar.');
      setLoading(false);
      return;
    }

    if (images.length === 0) {
      setError('Debes subir al menos una imagen de la moto.');
      setLoading(false);
      return;
    }

    try {
      // Primero crear la moto
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price),
          year: parseInt(formData.year),
          cc: parseInt(formData.cc),
          mileage: formData.mileage ? parseInt(formData.mileage) : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Luego subir las imágenes (en un caso real)
        // const imageUrls = await uploadImages(data.motorcycle.id);
        
        setSuccess('¡Tu moto ha sido enviada para revisión! Serás notificado cuando sea aprobada.');
        
        // Limpiar formulario
        setFormData({
          name: '',
          price: '',
          category: 'Deportivas',
          year: new Date().getFullYear().toString(),
          cc: '',
          description: '',
          location: 'Garzón, Huila',
          condition: 'Excelente',
          mileage: '',
          brand: '',
          model: ''
        });
        setImages([]);
        setImagePreviews([]);
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(data.message || 'Error al publicar la moto');
      }
    } catch (err: any) {
      setError('Error de conexión. Intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-100 rounded-full mb-4">
            <Camera className="w-8 h-8 text-lime-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Publica tu Moto</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vende tu moto de manera segura en Garzón, Huila. Completa todos los campos para una mejor experiencia de venta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          {/* Sección de imágenes */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-lime-600" />
              Fotos de la Moto
            </h3>
            
            {/* Área de carga de imágenes */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-lime-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={loading}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-600 mb-2">
                  Sube fotos de tu moto
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG hasta 5MB cada una. Máximo 5 imágenes.
                </p>
              </label>
            </div>

            {/* Previsualizaciones */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información básica */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Tag className="w-5 h-5 mr-2 text-lime-600" />
              Información Básica
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la Publicación
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  placeholder="Ej: Yamaha R15 V4 2023 - Como nueva"
                />
              </div>
              
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                  Marca
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  required
                  value={formData.brand}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  placeholder="Ej: Yamaha, Honda, Kawasaki"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Modelo
                </label>
                <input
                  type="text"
                  name="model"
                  id="model"
                  required
                  value={formData.model}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  placeholder="Ej: R15, CBR 600, Ninja 300"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                >
                  <option>Deportivas</option>
                  <option>Naked</option>
                  <option>Scooter</option>
                  <option>Enduro</option>
                  <option>Adventure</option>
                  <option>Street</option>
                  <option>Touring</option>
                  <option>Urbana</option>
                </select>
              </div>
            </div>
          </div>

          {/* Detalles técnicos */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Gauge className="w-5 h-5 mr-2 text-lime-600" />
              Detalles Técnicos
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Año
                </label>
                <input
                  type="number"
                  name="year"
                  id="year"
                  required
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="cc" className="block text-sm font-medium text-gray-700 mb-2">
                  Cilindraje (cc)
                </label>
                <input
                  type="number"
                  name="cc"
                  id="cc"
                  required
                  min="50"
                  value={formData.cc}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  placeholder="150"
                />
              </div>
              
              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">
                  Kilometraje
                </label>
                <input
                  type="number"
                  name="mileage"
                  id="mileage"
                  min="0"
                  value={formData.mileage}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  placeholder="15000"
                />
              </div>
              
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  name="condition"
                  id="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                >
                  <option>Excelente</option>
                  <option>Muy Bueno</option>
                  <option>Bueno</option>
                  <option>Regular</option>
                  <option>Para Reparar</option>
                </select>
              </div>
            </div>
          </div>

          {/* Precio y ubicación */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-lime-600" />
              Precio y Ubicación
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (COP)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  min="100000"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  placeholder="5000000"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-lime-600" />
              Descripción Detallada
            </h3>
            <div>
              <textarea
                name="description"
                id="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors resize-none"
                placeholder="Describe el estado de la moto, modificaciones, razón de venta, etc. Mientras más detalles proporciones, más confianza generas en los compradores."
              />
              <p className="text-sm text-gray-500 mt-2">
                Mínimo 50 caracteres. Incluye detalles sobre mantenimiento, modificaciones y estado general.
              </p>
            </div>
          </div>

          {/* Mensajes de error y éxito */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center">
              <X className="w-5 h-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg">
              <span>{success}</span>
            </div>
          )}

          {/* Botón de envío */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-lime-600 to-lime-700 hover:from-lime-700 hover:to-lime-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Publicando...
                </div>
              ) : (
                'Enviar para Revisión'
              )}
            </button>
            <p className="text-sm text-gray-500 text-center mt-3">
              Tu publicación será revisada antes de ser visible públicamente.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VenderPage;