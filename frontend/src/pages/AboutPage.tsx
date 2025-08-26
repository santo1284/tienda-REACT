import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HERO DE ABOUT */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            
            {/* BADGE */}
            <div className="inline-flex items-center space-x-2 bg-orange-500/20 text-orange-300 rounded-full px-6 py-3 mb-8 backdrop-blur-sm border border-orange-500/30">
              <span className="text-xl">🏍️</span>
              <span className="font-medium">Nuestra Historia</span>
            </div>
            
            {/* TÍTULO */}
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Mi Moto del <span className="text-orange-400">Pueblo</span>
            </h1>
            
            {/* SUBTÍTULO */}
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              La historia de cómo una pasión por las motocicletas se convirtió en la plataforma 
              más confiable de Garzón, Huila para conectar motociclistas con sus sueños sobre ruedas.
            </p>

            {/* UBICACIÓN */}
            <div className="mt-8 flex items-center justify-center space-x-2 text-orange-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">Garzón, Huila - Colombia</span>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRA HISTORIA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            <div className="bg-white rounded-3xl shadow-xl p-12 mb-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center">
                  <span className="text-3xl">📖</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
                  <p className="text-orange-600 font-medium">Desde 2018 sirviendo a la comunidad</p>
                </div>
              </div>
              
              <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
                <p className="text-lg leading-relaxed">
                  Todo comenzó en <strong className="text-gray-900">2018</strong> cuando Santiago Calderon, 
                  un mecánico apasionado por las motocicletas con más de 15 años de experiencia, 
                  notó un problema en su querido <strong className="text-orange-600">Garzón, Huila</strong>: 
                  era muy difícil para las personas comprar, vender o encontrar servicios confiables 
                  para sus motos.
                </p>
                
                <p className="text-lg leading-relaxed">
                  En nuestra región, las motocicletas no son solo un medio de transporte, son parte 
                  de nuestra cultura. Desde estudiantes que las usan para llegar a clase, hasta 
                  trabajadores que dependen de ellas para su sustento diario. Sin embargo, las estafas 
                  y publicaciones falsas estaban afectando la confianza de la comunidad.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Fue así como nació <strong className="text-orange-600">"Mi Moto del Pueblo"</strong>, 
                  con una misión clara: <em>crear un espacio seguro y confiable donde los garzoneños 
                  pudieran comprar, vender, alquilar y recibir servicios para sus motocicletas sin 
                  temor a ser estafados.</em>
                </p>

                <div className="bg-orange-50 rounded-2xl p-6 border-l-4 border-orange-400">
                  <h3 className="font-bold text-gray-900 mb-2">💡 Nuestro compromiso</h3>
                  <p className="text-gray-700">
                    Verificamos cada moto publicada, validamos la identidad de los vendedores y 
                    garantizamos que todos los documentos estén en orden. Porque en Garzón, 
                    la confianza se construye moto a moto.
                  </p>
                </div>
              </div>
            </div>

            {/* ESTADÍSTICAS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { number: '2018', label: 'Año de fundación', icon: '📅' },
                { number: '500+', label: 'Motos vendidas', icon: '🏍️' },
                { number: '1200+', label: 'Clientes felices', icon: '😊' },
                { number: '98%', label: 'Satisfacción', icon: '⭐' }
              ].map(({ number, label, icon }) => (
                <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl mb-2">{icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{number}</div>
                  <div className="text-sm text-gray-600 font-medium">{label}</div>
                </div>
              ))}
            </div>

            {/* NUESTROS VALORES */}
            <div className="bg-white rounded-3xl shadow-xl p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
                <p className="text-gray-600 text-lg">Los principios que guían cada decisión en Mi Moto del Pueblo</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: '🛡️',
                    title: 'Confianza',
                    description: 'Verificamos cada moto y vendedor para garantizar transacciones seguras y transparentes.'
                  },
                  {
                    icon: '🤝',
                    title: 'Comunidad',
                    description: 'Somos parte de Garzón y trabajamos para fortalecer nuestra comunidad motociclista.'
                  },
                  {
                    icon: '💎',
                    title: 'Calidad',
                    description: 'Ofrecemos servicios de primera calidad, desde nuestro taller hasta nuestra plataforma.'
                  }
                ].map(({ icon, title, description }) => (
                  <div key={title} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRO EQUIPO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
              <p className="text-xl text-gray-600">Las personas que hacen posible Mi Moto del Pueblo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Santiago Calderon',
                  role: 'Fundador & Mecánico Jefe',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
                  description: '15+ años de experiencia en mecánica de motos. Especialista en todas las marcas.'
                },
                {
                  name: 'María Rodríguez',
                  role: 'Gerente Comercial',
                  image: 'data:image/jpeg;base64,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',
                  description: 'Experta en atención al cliente y negociación. Tu aliada para encontrar la moto perfecta.'
                },
                {
                  name: 'Andrés López',
                  role: 'Técnico en Verificación',
                  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
                  description: 'Encargado de verificar documentos y estado técnico de todas las motos publicadas.'
                }
              ].map(({ name, role, image, description }) => (
                <div key={name} className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                  <p className="text-orange-600 font-medium mb-4">{role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                ¿Listo para ser parte de nuestra historia? 🏍️
              </h2>
              <p className="text-xl leading-relaxed opacity-90">
                Únete a cientos de motociclistas que ya confían en Mi Moto del Pueblo. 
                Tu próxima aventura sobre ruedas te está esperando en Garzón.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/motos" 
                className="group bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>🏍️ Explorar Motos</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a 
                href="https://wa.me/573001234567?text=Hola,%20quiero%20conocer%20más%20sobre%20Mi%20Moto%20del%20Pueblo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>💬 Contáctanos</span>
              </a>
            </div>
            
            <div className="mt-8 text-sm opacity-75">
              <p>🔒 Transacciones seguras • 🛡️ Verificación garantizada • ⭐ 98% satisfacción</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;