import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bike, DollarSign, Clock } from 'lucide-react';

// Definir la interfaz para un objeto de alquiler
interface Rental {
  id: string;
  model: string;
  pricePerDay: number;
  pricePerHour?: number;
  image: string;
  availability: 'available' | 'rented' | 'reserved' | 'maintenance';
  description: string;
  category: string;
}

const RentalCard: React.FC<{ rental: Rental }> = ({ rental }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group">
    <div className="relative">
      <img src={rental.image} alt={rental.model} className="w-full h-48 object-cover" />
      {rental.availability !== 'available' && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
          {rental.availability === 'rented' ? 'Alquilada' : 'Reservada'}
        </div>
      )}
       <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-20"></div>
       <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold">{rental.model}</h3>
    </div>
    <div className="p-4">
      <p className="text-sm text-gray-500 mb-2">{rental.category}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-lg font-bold text-gray-800">
          <DollarSign className="w-5 h-5 mr-1 text-green-500" />
          {rental.pricePerDay} <span className="text-sm font-normal text-gray-500 ml-1">/ día</span>
        </div>
        {rental.pricePerHour && (
          <div className="flex items-center text-md font-semibold text-gray-700">
            <Clock className="w-4 h-4 mr-1 text-blue-500" />
            {rental.pricePerHour} <span className="text-sm font-normal text-gray-500 ml-1">/ hora</span>
          </div>
        )}
      </div>
      <Link
        to={`/rentals/${rental.id}`} // Asumiendo que habrá una página de detalle
        className={`w-full text-center block py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${
          rental.availability === 'available'
            ? 'bg-lime-500 text-white hover:bg-lime-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        onClick={(e) => rental.availability !== 'available' && e.preventDefault()}
      >
        {rental.availability === 'available' ? 'Ver Detalles y Alquilar' : 'No Disponible'}
      </Link>
    </div>
  </div>
);

const AlquilerPage: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/rentals');
        if (!response.ok) {
          throw new Error('No se pudieron obtener los datos de alquiler.');
        }
        const data: Rental[] = await response.json();
        setRentals(data);
      } catch (err: any) {
        setError(err.message || 'Error de conexión.');
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Bike className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Alquiler de Motos</h1>
          <p className="text-lg text-gray-600 mt-2">
            Disfruta de Garzón y sus alrededores sobre dos ruedas.
          </p>
        </div>

        {loading && (
          <div className="text-center">
            <p className="text-lg text-gray-600">Cargando motos disponibles...</p>
          </div>
        )}

        {error && (
          <div className="text-center bg-red-100 text-red-700 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && rentals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {rentals.map(rental => (
              <RentalCard key={rental.id} rental={rental} />
            ))}
          </div>
        )}

        {!loading && !error && rentals.length === 0 && (
          <div className="text-center bg-yellow-100 text-yellow-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold">No hay motos disponibles para alquilar en este momento.</h3>
            <p className="mt-2">Por favor, vuelve a intentarlo más tarde.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlquilerPage;
