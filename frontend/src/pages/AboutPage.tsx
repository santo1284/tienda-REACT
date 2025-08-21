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
                  Todo comenzó en <strong className="text-gray-900">2018</strong> cuando Carlos Mendoza, 
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
                  name: 'Carlos Mendoza',
                  role: 'Fundador & Mecánico Jefe',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
                  description: '15+ años de experiencia en mecánica de motos. Especialista en todas las marcas.'
                },
                {
                  name: 'María Rodríguez',
                  role: 'Gerente Comercial',
                  image: 'https://images.unsplash.com/photo-1494790108755-2616b332c42c?w=300&h=300&fit=crop&crop=face',
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