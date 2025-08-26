import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

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
    image: 'https://via.placeholder.com/400x300.png?text=Imagen+de+la+Moto'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!authState.user) {
        setError('Debes iniciar sesión para publicar.');
        return;
    }

    try {
      const response = await api.post('/products', {
        ...formData,
        price: parseInt(formData.price),
        year: parseInt(formData.year),
        cc: parseInt(formData.cc),
      });

      if (response.status === 201) {
        setSuccess('¡Tu moto ha sido enviada para revisión! Serás notificado cuando sea aprobada.');
        // Opcional: limpiar formulario
        // Opcional: redirigir después de unos segundos
        setTimeout(() => {
            navigate('/'); // Redirigir a la página de inicio
        }, 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ocurrió un error al publicar la moto.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Publica tu Moto</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Título de la Publicación</label>
          <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio (COP)</label>
                <input type="number" name="price" id="price" required value={formData.price} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">Año</label>
                <input type="number" name="year" id="year" required value={formData.year} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="cc" className="block text-sm font-medium text-gray-700">Cilindraje (cc)</label>
                <input type="number" name="cc" id="cc" required value={formData.cc} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm" />
            </div>
        </div>

        <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
            <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm">
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

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea name="description" id="description" required value={formData.description} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"></textarea>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}

        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500">
            Enviar para Revisión
          </button>
        </div>
      </form>
    </div>
  );
};

export default VenderPage;
