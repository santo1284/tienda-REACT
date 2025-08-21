import React from 'react';

const ServiciosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Nuestros Servicios</h1>
          <p className="text-lg text-gray-600 mt-2">
            Todo lo que necesitas para mantener tu moto en perfecto estado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Servicio 1: Mantenimiento Preventivo */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mantenimiento Preventivo</h2>
            <p className="text-gray-600">
              Realizamos revisiones completas para asegurar que tu moto funcione de manera óptima y segura. Cambios de aceite, revisión de frenos, ajuste de cadena y más.
            </p>
          </div>

          {/* Servicio 2: Diagnóstico Electrónico */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Diagnóstico Electrónico</h2>
            <p className="text-gray-600">
              Contamos con equipos de última generación para diagnosticar cualquier falla electrónica en tu motocicleta. Soluciones precisas y rápidas.
            </p>
          </div>

          {/* Servicio 3: Trámites y SOAT */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Trámites y SOAT</h2>
            <p className="text-gray-600">
              Te ayudamos con todos los trámites de tu vehículo. Expedición y renovación del SOAT, traspasos, y más, para que solo te preocupes por rodar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiciosPage;
