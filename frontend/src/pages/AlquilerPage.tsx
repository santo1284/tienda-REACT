import React from 'react';

const AlquilerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Alquiler de Motos</h1>
          <p className="text-lg text-gray-600 mt-2">
            Disfruta de Garzón y sus alrededores sobre dos ruedas.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tarifas de Alquiler</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Tipo de Moto</th>
                  <th className="py-2 px-4 border-b">Precio por Hora</th>
                  <th className="py-2 px-4 border-b">Precio por Día</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Scooter (125cc)</td>
                  <td className="py-2 px-4 border-b">$20,000</td>
                  <td className="py-2 px-4 border-b">$80,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Moto de Calle (150-200cc)</td>
                  <td className="py-2 px-4 border-b">$30,000</td>
                  <td className="py-2 px-4 border-b">$120,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Moto de Aventura (300cc+)</td>
                  <td className="py-2 px-4 border-b">$50,000</td>
                  <td className="py-2 px-4 border-b">$200,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-600 mt-4">
            Todos nuestros alquileres incluyen casco y seguro básico. Se requiere licencia de conducción vigente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlquilerPage;
