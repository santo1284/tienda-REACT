import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api'; // Usaremos el api util para las llamadas
import { Camera, Upload, X } from 'lucide-react';

const AdminPublishPage: React.FC = () => {
  const navigate = useNavigate();
  const { state: authState } = useAuth();
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
        setSuccess('¡Moto publicada exitosamente!');
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      } else {
        setError(response.data.message || 'Error al publicar la moto.');
      }
    } catch (err: any) {
      setError('Error de conexión o del servidor. Intenta de nuevo.');
      console.error('Error en handleSubmit:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Publicar Nueva Moto</h1>
          <p className="text-lg text-gray-600">Publica una moto directamente en el catálogo.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Form fields copied from VenderPage, simplified for single image upload */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Foto de la Moto</h3>
            <div className="border-2 border-dashed rounded-xl p-6 text-center">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" disabled={loading} />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                <p>Sube la foto principal</p>
              </label>
            </div>
            {imagePreview && (
              <div className="relative w-48 mx-auto">
                <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg" />
                <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={16} /></button>
              </div>
            )}
          </div>

          {/* Other form fields like name, brand, price etc. go here */}
          {/* This is a simplified example. A full implementation would have all fields from VenderPage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Título de la publicación" className="w-full p-3 border rounded"/>
            <input type="text" name="brand" required value={formData.brand} onChange={handleChange} placeholder="Marca" className="w-full p-3 border rounded"/>
            <input type="text" name="model" required value={formData.model} onChange={handleChange} placeholder="Modelo" className="w-full p-3 border rounded"/>
            <input type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="Precio" className="w-full p-3 border rounded"/>
            <input type="number" name="year" required value={formData.year} onChange={handleChange} placeholder="Año" className="w-full p-3 border rounded"/>
            <input type="number" name="cc" required value={formData.cc} onChange={handleChange} placeholder="Cilindraje" className="w-full p-3 border rounded"/>
            <textarea name="description" required value={formData.description} onChange={handleChange} placeholder="Descripción" className="w-full p-3 border rounded md:col-span-2"/>
          </div>

          {error && <div className="text-red-500 bg-red-100 p-3 rounded">{error}</div>}
          {success && <div className="text-green-500 bg-green-100 p-3 rounded">{success}</div>}

          <div className="pt-6">
            <button type="submit" disabled={loading} className="w-full bg-lime-600 text-white font-semibold py-3 rounded-lg hover:bg-lime-700 disabled:opacity-50">
              {loading ? 'Publicando...' : 'Publicar Moto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPublishPage;
