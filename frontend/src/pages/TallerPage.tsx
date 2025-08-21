import React from 'react';

const TallerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Nuestro Taller</h1>
          <p className="text-lg text-gray-600 mt-2">
            Mecánicos expertos y la mejor tecnología para cuidar de tu moto.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Especialistas en Todas las Marcas</h2>
              <p className="text-gray-600 mb-4">
                Nuestro equipo de mecánicos certificados tiene una amplia experiencia en la reparación y mantenimiento de motocicletas de todas las marcas y modelos, desde scooters hasta motos de alto cilindraje.
              </p>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Horarios de Atención:</h3>
              <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Sábados: 8:00 AM - 2:00 PM</p>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/500x300.png?text=Nuestro+Taller+Moderno"
                alt="Taller de motos"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TallerPage;
