import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

interface Motorcycle {
  _id: string;
  name: string;
  status: string;
  adminNotes?: string;
  image: string;
}

const UserInboxPage: React.FC = () => {
  const [myMotorcycles, setMyMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyMotorcycles = async () => {
      try {
        const { data } = await api.get('/products/my-listings');
        // El backend devuelve un objeto { motorcycles: [...] }, accedemos al array
        if (data && Array.isArray(data.motorcycles)) {
          setMyMotorcycles(data.motorcycles);
        } else {
          // Si la respuesta no es el formato esperado, evitamos el error .map
          setMyMotorcycles([]);
          console.error("La respuesta de la API no tiene el formato esperado:", data);
        }
      } catch (err) {
        setError('No se pudieron cargar tus publicaciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyMotorcycles();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'aprobado':
        return 'bg-green-100 text-green-800';
      case 'en revisión':
        return 'bg-blue-100 text-blue-800';
      case 'rechazado':
        return 'bg-red-100 text-red-800';
      case 'requiere cambios':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div>Cargando tus publicaciones...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Mis Publicaciones</h1>

      {myMotorcycles.length === 0 ? (
        <div className="text-center py-10">
          <p>Aún no has publicado ninguna moto.</p>
          <Link to="/vender" className="mt-4 inline-block bg-lime-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-lime-700">
            ¡Publica tu primera moto!
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myMotorcycles.map((moto) => (
            <div key={moto._id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-start space-x-4">
                    <img src={moto.image} alt={moto.name} className="w-32 h-24 object-cover rounded-md" />
                    <div className="flex-grow">
                        <p className="font-bold text-lg">{moto.name}</p>
                        <p>
                            Estado: <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(moto.status)}`}>
                                {moto.status.charAt(0).toUpperCase() + moto.status.slice(1)}
                            </span>
                        </p>
                        {moto.status === 'requiere cambios' && moto.adminNotes && (
                            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                                <p className="font-semibold text-yellow-800">Notas del Administrador:</p>
                                <p className="text-sm text-yellow-700 italic">"{moto.adminNotes}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInboxPage;
