import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext'; // Importar el hook del contexto

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath] = useState('/'); // Simulando ruta actual
  
  // ✅ Usar el hook del contexto del carrito
  const { state: cartState } = useCart();

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* LOGO DE MI MOTO DEL PUEBLO */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo container con efecto */}
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-2xl font-bold text-white">🏍️</span>
              </div>
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-300 transform -skew-x-12"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                Mi Moto del Pueblo
              </h1>
              <p className="text-xs text-orange-600 font-medium -mt-1">Garzón, Huila</p>
            </div>
          </Link>
          
          
          {/* NAVEGACIÓN PRINCIPAL */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { path: '/', label: 'Inicio' },
              { path: '/products', label: 'Motos' },
              { path: '/servicios', label: 'Servicios' },
              { path: '/taller', label: 'Taller' },
              { path: '/alquiler', label: 'Alquiler' },
              { path: '/about', label: 'Nosotros' },
              { path: '/contact', label: 'Contacto' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-orange-400 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* SECCIÓN DERECHA */}
          <div className="flex items-center space-x-4">
            
            {/* Botón de WhatsApp */}
            <a 
              href="https://wa.me/573001234567?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20motos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="text-sm">WhatsApp</span>
            </a>

            {/* Botón de llamada directa */}
            <a 
              href="tel:+573001234567"
              className="hidden md:flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm">Llamar</span>
            </a>

            {/* CARRITO */}
            <Link 
              to="/cart" 
              className="relative group"
            >
              <div className="flex items-center space-x-3 bg-lime-400 hover:bg-lime-500 text-black px-4 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl">
                <div className="relative">
                  {/* Ícono de carrito */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0h8" />
                  </svg>
                  
                  {/* ✅ Contador del carrito - solo se muestra cuando hay productos */}
                  {cartState.itemCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center animate-pulse">
                      {cartState.itemCount}
                    </div>
                  )}
                </div>
                
                <div className="hidden sm:block">
                  <span className="font-medium">Carrito</span>
                  <p className="text-xs text-gray-600 -mt-1">
                    {cartState.itemCount > 0 
                      ? `${cartState.itemCount} ${cartState.itemCount === 1 ? 'producto' : 'productos'}`
                      : 'Vacío'
                    }
                  </p>
                </div>
              </div>
            </Link>
            
            {/* FAVORITOS (separado del carrito) */}
            <Link 
              to="/gusta" 
              className="relative group"
            >
              <div className="flex items-center space-x-3 bg-gray-900 text-white px-4 py-3 rounded-2xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                <div className="relative">
                  {/* Ícono de favoritos */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                
                <div className="hidden sm:block">
                  <span className="font-medium">Favoritos</span>
                  <p className="text-xs text-gray-300 -mt-1">Motos guardadas</p>
                </div>
              </div>
            </Link>

            {/* Botón de menú móvil */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* NAVEGACIÓN MÓVIL */}
        <nav className={`lg:hidden mt-4 transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { path: '/', label: 'Inicio', icon: '🏠' },
                { path: '/products', label: 'Motos', icon: '🏍️' },
                { path: '/servicios', label: 'Servicios', icon: '🔧' },
                { path: '/taller', label: 'Taller', icon: '⚙️' },
                { path: '/alquiler', label: 'Alquiler', icon: '📋' },
                { path: '/about', label: 'Nosotros', icon: '🏢' }
              ].map(({ path, label, icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex flex-col items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive(path)
                      ? 'bg-orange-400 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <span className="text-xl mb-1">{icon}</span>
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              ))}
            </div>
            
            {/* Contacto rápido móvil */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200">
              <a 
                href="https://wa.me/573001234567?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20motos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl transition-all duration-200 shadow-md font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="text-xs">WhatsApp</span>
              </a>
              
              <a 
                href="tel:+573001234567"
                className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl transition-all duration-200 shadow-md font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xs">Llamar</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
};

export default Header;