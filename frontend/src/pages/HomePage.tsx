import React, { useState } from 'react';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  // Datos de muestra de motos destacadas
  const featuredMotos = [
    {
      id: 1,
      name: "Honda CBR 600RR 2023",
      price: 15500000,
      image: "https://i.blogs.es/f0a5d5/cbr600rr-1-2023/1366_2000.jpeg",
      category: "Deportivas",
      condition: "Nueva",
      cc: 600,
      seller: "Concesionario Honda"
    },
    {
      id: 2,
      name: "Yamaha MT-07 2022",
      price: 12800000,
      image: "https://bikes.motobank.co.uk/fp/27277/yamaha-mt-07-2022-icon-blue_471458.jpg",
      category: "Naked",
      condition: "Seminueva",
      cc: 689,
      seller: "Moto Usadas Garzón"
    },
    {
      id: 3,
      name: "Honda PCX 150 2023",
      price: 8900000,
      image: "https://motos.honda.com.co/images/blogs/HondaPCX150.png",
      category: "Scooter",
      condition: "Seminueva",
      cc: 149,
      seller: "Motos del Centro"
    }
  ];

  const formatPrice = (price: string | number | bigint) => {
    const numericPrice = typeof price === 'string' ? Number(price) : price;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(numericPrice);
  };

  return (
    <div className="bg-gray-50">
      
      {/* HERO SECTION ESPECTACULAR */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* FONDO CON IMAGEN DE MOTO Y EFECTOS */}
        <div className="absolute inset-0">
          {/* Imagen de fondo */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          
          {/* Efectos de partículas */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          {/* Puntos decorativos */}
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-orange-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-1000"></div>
        </div>
        
        {/* CONTENIDO PRINCIPAL DEL HERO */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* LADO IZQUIERDO: TEXTO Y BOTONES */}
            <div className="text-center lg:text-left text-white">
              
              {/* BADGE DE UBICACIÓN */}
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8 shadow-lg">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">📍 Garzón, Huila - Colombia</span>
              </div>
              
              {/* TÍTULO PRINCIPAL */}
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block">Mi Moto del</span>
                <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                  Pueblo
                </span>
                <span className="block text-3xl lg:text-4xl text-gray-300 font-normal">Tu moto ideal te espera</span>
              </h1>
              
              {/* SUBTÍTULO */}
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                La plataforma más <strong className="text-white">confiable</strong> de Garzón para comprar, vender, 
                alquilar motos y acceder a servicios de <em className="text-orange-400">taller mecánico</em> especializado.
              </p>
              
              {/* ESTADÍSTICAS RÁPIDAS */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
                {[
                  { number: '500+', label: 'Motos disponibles', icon: '🏍️' },
                  { number: '1200+', label: 'Clientes felices', icon: '😊' },
                  { number: '98%', label: 'Satisfacción', icon: '⭐' }
                ].map(({ number, label, icon }) => (
                  <div key={label} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                    <div className="text-lg mb-1">{icon}</div>
                    <div className="text-xl font-bold text-white">{number}</div>
                    <div className="text-xs text-gray-300">{label}</div>
                  </div>
                ))}
              </div>
              
              {/* BOTONES DE ACCIÓN */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="/products" 
                  className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-3"
                >
                  <span>🏍️ Ver Motos Disponibles</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                <a 
                  href="/vender" 
                  className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                >
                  <span>💰 Vender mi Moto</span>
                </a>
              </div>

              {/* CONTACTO RÁPIDO */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a 
                  href="https://wa.me/573001234567?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20las%20motos%20disponibles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                
                <a 
                  href="tel:+573001234567"
                  className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Llamar</span>
                </a>
              </div>
            </div>
            
            {/* LADO DERECHO: SHOWCASE DE MOTO */}
            <div className="relative">
              
              {/* TARJETA PRINCIPAL CON MOTO DESTACADA */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                
                {/* MOTO SHOWCASE */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
                    {/* Imagen de moto */}
                    <div className="relative z-10 flex items-center justify-center h-48">
                      <img 
                        src="https://i.blogs.es/f0a5d5/cbr600rr-1-2023/1366_2000.jpeg" 
                        alt="Honda CBR Featured"
                        className="h-full w-auto object-contain rounded-xl"
                      />
                    </div>
                    
                    {/* Efectos de fondo */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Honda CBR 600RR 2023</h3>
                  <p className="text-gray-600 mb-4">Deportiva de alta gama - Estado: Nueva</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">$15,500,000</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* FLOATING ELEMENTS */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                  ¡Verificada!
                </div>
              </div>
              
              {/* TARJETAS FLOTANTES MEJORADAS */}
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">✓ Sin estafas</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-pulse">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📋</span>
                  <span className="text-sm font-medium text-gray-700">Documentos verificados</span>
                </div>
              </div>
              
              {/* NUEVA TARJETA FLOTANTE - TALLER */}
              <div className="absolute top-1/2 -left-8 bg-orange-400 text-black rounded-2xl shadow-xl p-3 transform -rotate-12 animate-pulse delay-500">
                <div className="text-center">
                  <div className="text-lg font-bold">🔧</div>
                  <div className="text-xs font-bold">Taller</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE SERVICIOS PRINCIPALES */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 rounded-full px-6 py-3 mb-6">
              <span className="text-xl">🛠️</span>
              <span className="font-medium">Nuestros Servicios</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas en <span className="text-orange-500">un solo lugar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde comprar tu moto soñada hasta mantenerla en perfectas condiciones, 
              te acompañamos en cada kilómetro del camino.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🛒',
                title: 'Compra/Venta',
                description: 'Motos nuevas y usadas verificadas. Proceso seguro y transparente.',
                color: 'from-blue-500 to-cyan-500',
                features: ['Verificación garantizada', 'Documentos en regla', 'Precios justos']
              },
              {
                icon: '🔧',
                title: 'Taller Mecánico',
                description: 'Reparación y mantenimiento especializado para todas las marcas.',
                color: 'from-green-500 to-emerald-500',
                features: ['Mecánicos certificados', 'Repuestos originales', 'Garantía de servicio']
              },
              {
                icon: '📋',
                title: 'Alquiler',
                description: 'Alquila por días, semanas o meses. Ideal para turismo o trabajo.',
                color: 'from-purple-500 to-pink-500',
                features: ['Tarifas flexibles', 'Seguro incluido', 'Entrega a domicilio']
              },
              {
                icon: '💳',
                title: 'Financiación',
                description: 'Créditos hasta 60 meses con las mejores tasas del mercado.',
                color: 'from-orange-500 to-red-500',
                features: ['Aprobación rápida', 'Tasas competitivas', 'Sin trámites complicados']
              }
            ].map(({ icon, title, description, color, features }) => (
              <div key={title} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                
                {/* Icono con gradiente */}
                <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {description}
                </p>

                {/* Lista de características */}
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Botón de acción */}
                <div className="mt-6">
                  <a 
                    href={`/${title.toLowerCase().replace('/', '-').replace(' ', '-')}`}
                    className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 group"
                  >
                    <span>Más información</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE MOTOS DESTACADAS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          
          {/* HEADER DE LA SECCIÓN */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 rounded-full px-6 py-3 mb-6">
              <span className="text-xl">⭐</span>
              <span className="font-medium">Motos Destacadas</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Las más <span className="text-orange-500">populares</span> en Garzón
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre las motos más buscadas y mejor valoradas por nuestra comunidad
            </p>
          </div>

          {/* FILTROS DE CATEGORÍA */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Todas', 'Deportivas', 'Scooter', 'Naked', 'Urbanas'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* GRID DE MOTOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredMotos.map(moto => (
              <div key={moto.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100">
                
                {/* IMAGEN DE LA MOTO */}
                <div className="relative overflow-hidden">
                  <img 
                    src={moto.image}
                    alt={moto.name}
                    className="w-full h-56 object-cover transition-transform duration-700 hover:scale-110"
                  />
                  
                  {/* BADGES */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {moto.condition}
                    </span>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {moto.category}
                    </span>
                  </div>

                  {/* BOTÓN DE FAVORITO */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                {/* INFORMACIÓN */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{moto.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{moto.seller}</p>
                  
                  {/* SPECS */}
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <span className="text-xs">🏍️</span>
                      <span>{moto.cc}cc</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="text-xs">⚙️</span>
                      <span>Manual</span>
                    </span>
                  </div>
                  
                  {/* PRECIO Y BOTÓN */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(moto.price)}
                      </span>
                      <div className="text-xs text-gray-500">
                        Desde {formatPrice(Math.round(moto.price / 60))}/mes
                      </div>
                    </div>
                  </div>
                  
                  {/* BOTÓN DE CONTACTO */}
                  <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Contactar Vendedor</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* BOTÓN VER MÁS */}
          <div className="text-center">
            <a 
              href="/products" 
              className="inline-flex items-center space-x-2 bg-gray-900 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Ver Todas las Motos</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN POR QUÉ ELEGIRNOS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir <span className="text-orange-500">Mi Moto del Pueblo?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Somos más que una plataforma, somos tu aliado confiable en el mundo de las motocicletas en Garzón
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* LADO IZQUIERDO - BENEFICIOS */}
              <div className="space-y-8">
                {[
                  {
                    icon: '🛡️',
                    title: 'Verificación Garantizada',
                    description: 'Cada moto pasa por un riguroso proceso de verificación de documentos y estado técnico.',
                    color: 'bg-green-100 text-green-600'
                  },
                  {
                    icon: '🏠',
                    title: 'Empresa Local',
                    description: 'Somos de Garzón, conocemos las necesidades de nuestra comunidad motociclista.',
                    color: 'bg-blue-100 text-blue-600'
                  },
                  {
                    icon: '🔧',
                    title: 'Taller Especializado',
                    description: 'Contamos con mecánicos certificados y repuestos originales para todas las marcas.',
                    color: 'bg-purple-100 text-purple-600'
                  },
                  {
                    icon: '💰',
                    title: 'Precios Justos',
                    description: 'Sin sobrecostos ni comisiones ocultas. Transparencia total en cada transacción.',
                    color: 'bg-orange-100 text-orange-600'
                  }
                ].map(({ icon, title, description, color }) => (
                  <div key={title} className="flex items-start space-x-4 p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <span className="text-xl">{icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                      <p className="text-gray-600 leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* LADO DERECHO - ESTADÍSTICAS Y TESTIMONIAL */}
              <div className="space-y-8">
                
                {/* ESTADÍSTICAS */}
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Nuestros números hablan por sí solos</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { number: '500+', label: 'Motos vendidas' },
                      { number: '1200+', label: 'Clientes satisfechos' },
                      { number: '5', label: 'Años de experiencia' },
                      { number: '98%', label: 'Satisfacción' }
                    ].map(({ number, label }) => (
                      <div key={label} className="text-center">
                        <div className="text-3xl font-bold mb-1">{number}</div>
                        <div className="text-orange-100 text-sm">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TESTIMONIAL */}
                <div className="bg-gray-50 rounded-3xl p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&r=30" 
                      alt="Cliente satisfecho" 
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">Carlos Ramírez</h4>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">
                    "Compré mi Yamaha MT-07 a través de Mi Moto del Pueblo y la experiencia fue excelente. 
                    Todo verificado, sin sorpresas. Además, el taller me ha dado un servicio impecable. 
                    ¡100% recomendados!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE CALL TO ACTION FINAL */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-red-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="mb-8">
              <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                ¿Listo para encontrar tu <span className="text-orange-400">moto ideal?</span>
              </h2>
              <p className="text-xl lg:text-2xl leading-relaxed text-gray-300">
                Únete a cientos de motociclistas que ya confían en Mi Moto del Pueblo. 
                Tu próxima aventura sobre ruedas te está esperando en Garzón.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <a 
                href="/products" 
                className="group bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3 text-lg"
              >
                <span>🏍️ Explorar Motos</span>
                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a 
                href="/vender" 
                className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-3 text-lg"
              >
                <span>💰 Vender mi Moto</span>
              </a>
            </div>

            {/* CONTACTO DIRECTO */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span className="text-gray-300">¿Tienes preguntas?</span>
              <div className="flex gap-3">
                <a 
                  href="https://wa.me/573001234567?text=Hola,%20tengo%20preguntas%20sobre%20Mi%20Moto%20del%20Pueblo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
                
                <a 
                  href="tel:+573001234567"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Llamar</span>
                </a>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-gray-400">
              <p>🔒 Transacciones 100% seguras • 🛡️ Verificación garantizada • ⭐ 98% satisfacción • 📍 Garzón, Huila</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;