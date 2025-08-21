import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        
        {/* CONTENIDO PRINCIPAL DEL FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* COLUMNA 1: INFORMACIÓN DE LA EMPRESA */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">🏍️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Mi Moto del Pueblo</h3>
                <p className="text-sm text-orange-400 font-medium">Garzón, Huila - Colombia</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              La plataforma más confiable de compra, venta y servicios de motocicletas en Garzón, Huila. 
              Conectamos motociclistas con las mejores oportunidades del mercado, garantizando seguridad 
              y transparencia en cada transacción.
            </p>
            
            {/* ESTADÍSTICAS */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-orange-400">500+</div>
                <div className="text-sm text-gray-400">Motos publicadas</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400">98%</div>
                <div className="text-sm text-gray-400">Clientes satisfechos</div>
              </div>
            </div>
            
            {/* REDES SOCIALES */}
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', icon: '📘', color: 'hover:bg-blue-600', href: 'https://facebook.com/mimotodelpueblo' },
                { name: 'Instagram', icon: '📷', color: 'hover:bg-pink-600', href: 'https://instagram.com/mimotodelpueblo' },
                { name: 'WhatsApp', icon: '💬', color: 'hover:bg-green-600', href: 'https://wa.me/573001234567' },
                { name: 'TikTok', icon: '🎵', color: 'hover:bg-black', href: 'https://tiktok.com/@mimotodelpueblo' }
              ].map(({ name, icon, color, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 ${color} transform hover:scale-105`}
                  aria-label={name}
                >
                  <span className="text-lg">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* COLUMNA 2: ENLACES RÁPIDOS */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Navegación</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/products', label: 'Catálogo de Motos' },
                { to: '/vender', label: 'Vender mi Moto' },
                { to: '/servicios', label: 'Servicios' },
                { to: '/taller', label: 'Taller Mecánico' },
                { to: '/alquiler', label: 'Alquiler' },
                { to: '/financiacion', label: 'Financiación' },
                { to: '/about', label: 'Nosotros' }
              ].map(({ to, label }) => (
                <li key={to}>
                  <a 
                    href={to} 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 transform inline-block text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* COLUMNA 3: INFORMACIÓN DE CONTACTO */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contacto</h4>
            
            <div className="space-y-4">
              {[
                { 
                  icon: '📍', 
                  title: 'Ubicación', 
                  content: 'Centro de Garzón\nHuila, Colombia\nFrente al parque principal' 
                },
                { 
                  icon: '📞', 
                  title: 'Teléfono', 
                  content: '+57 300 123 4567\n+57 8 875 1234' 
                },
                { 
                  icon: '✉️', 
                  title: 'Email', 
                  content: 'info@mimotodelpueblo.com\nventas@mimotodelpueblo.com' 
                },
                { 
                  icon: '🕒', 
                  title: 'Horarios', 
                  content: 'Lun - Vie: 8AM - 6PM\nSáb: 8AM - 4PM\nDom: 9AM - 1PM' 
                }
              ].map(({ icon, title, content }) => (
                <div key={title} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{icon}</span>
                  </div>
                  <div>
                    <h6 className="font-medium text-white text-sm">{title}</h6>
                    <p className="text-gray-400 text-sm whitespace-pre-line">{content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* SECCIÓN DE SERVICIOS PRINCIPALES */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-lg font-semibold text-white mb-4 text-center">Nuestros Servicios</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🛒', title: 'Compra/Venta', desc: 'Motos nuevas y usadas' },
              { icon: '🔧', title: 'Taller Mecánico', desc: 'Reparación y mantenimiento' },
              { icon: '📋', title: 'Alquiler', desc: 'Alquiler por días/meses' },
              { icon: '💳', title: 'Financiación', desc: 'Crédito hasta 60 meses' }
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="text-xs text-gray-400">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* LÍNEA SEPARADORA */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* COPYRIGHT */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; 2025 Mi Moto del Pueblo. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Plataforma diseñada especialmente para Garzón, Huila 🏍️
              </p>
            </div>
            
            {/* BADGES DE CONFIANZA */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-green-400">🔒</span>
                <span className="text-xs font-medium text-gray-300">Transacciones Seguras</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-blue-400">🛡️</span>
                <span className="text-xs font-medium text-gray-300">Verificación de Documentos</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-orange-400">⭐</span>
                <span className="text-xs font-medium text-gray-300">98% Satisfacción</span>
              </div>
            </div>
          </div>
        </div>

        {/* LLAMADA A LA ACCIÓN FINAL */}
        <div className="mt-8 text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            ¿Tienes una moto para vender? 🏍️
          </h3>
          <p className="text-orange-100 mb-4">
            Publícala gratis en nuestra plataforma y conecta con cientos de compradores interesados
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/vender"
              className="bg-white text-orange-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>📝</span>
              <span>Publicar Gratis</span>
            </a>
            <a 
              href="https://wa.me/573001234567?text=Hola,%20quiero%20vender%20mi%20moto"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 transition-all duration-200 inline-flex items-center justify-center space-x-2"
            >
              <span>💬</span>
              <span>Contactar Asesor</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;