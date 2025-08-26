import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import imagenLogo from '../../img/image.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { state: cartState } = useCart();
  const { state: authState, dispatch: authDispatch } = useAuth();
  const { state: favoritesState } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ruta actual

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    authDispatch({ type: 'LOGOUT' });
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-2xl font-bold text-white"><img src={imagenLogo} alt="Logo" /></span>
              </div>
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
              { path: '/', label: 'Inicio', auth: false },
              { path: '/products', label: 'Motos', auth: false },
              { path: '/vender', label: 'Vender', auth: true },
              { path: '/servicios', label: 'Servicios', auth: false },
              { path: '/taller', label: 'Taller', auth: false },
              { path: '/alquiler', label: 'Alquiler', auth: false },
              { path: '/about', label: 'Nosotros', auth: false },
              { path: '/contact', label: 'Contacto', auth: false }
            ]
            .filter(link => !link.auth || (link.auth && authState.isAuthenticated))
            .map(({ path, label }) => (
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
            
            {/* CARRITO */}
            <Link to="/cart" className="relative group">
              <div className="flex items-center space-x-3 bg-lime-400 hover:bg-lime-500 text-black px-4 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl">
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0h8" />
                  </svg>
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
                      ? `${cartState.itemCount} ${cartState.itemCount === 1 ? 'moto' : 'motos'}`
                      : 'Vacío'
                    }
                  </p>
                </div>
              </div>
            </Link>

             {/* Me gusta */}
            <Link to="/gusta" className="relative group">
              <div className="flex items-center space-x-3 bg-pink-400 hover:bg-pink-500 text-white px-4 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl">
                <div className="relative">
                  {/* Ícono de corazón */}
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21C12 21 5 13.5 5 8.5C5 5.42 7.42 3 10.5 3C12.24 3 13.91 3.81 15 5.09C16.09 3.81 17.76 3 19.5 3C22.58 3 25 5.42 25 8.5C25 13.5 18 21 18 21H12Z" />
                  </svg>
                  {favoritesState.itemCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center animate-bounce">
                      {favoritesState.itemCount}
                    </div>
                  )}
                </div>
                <div className="hidden sm:block">
                  <span className="font-medium">Me gusta</span>
                  <p className="text-xs text-gray-200 -mt-1">
                    {favoritesState.itemCount > 0 
                      ? `${favoritesState.itemCount} ${favoritesState.itemCount === 1 ? 'artículo' : 'artículos'}`
                      : 'Sin favoritos'}
                  </p>
                </div>
              </div>
            </Link>

            {/* SECCIÓN DE USUARIO */}
            <div className="relative hidden lg:block">
              {authState.isAuthenticated ? (
                <div>
                  <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors">
                    <span className="font-medium text-gray-800">{authState.user?.name.split(' ')[0]}</span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50">
                      <Link
                        to="/my-inbox"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mis Publicaciones
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="px-4 py-2 text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="px-4 py-2 bg-lime-500 text-white font-medium rounded-xl hover:bg-lime-600 transition-colors">
                    Registrarse
                  </Link>
                </div>
              )}
            </div>

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
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            {[
              { path: '/', label: 'Inicio', auth: false },
              { path: '/products', label: 'Motos', auth: false },
              { path: '/vender', label: 'Vender', auth: true },
              { path: '/servicios', label: 'Servicios', auth: false },
              { path: '/taller', label: 'Taller', auth: false },
              { path: '/alquiler', label: 'Alquiler', auth: false },
              { path: '/about', label: 'Nosotros', auth: false },
              { path: '/contact', label: 'Contacto', auth: false }
            ]
            .filter(link => !link.auth || (link.auth && authState.isAuthenticated))
            .map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-center font-bold py-3 px-4 rounded-xl transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-orange-400 text-white shadow-md'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Auth buttons for mobile */}
            <div className="pt-4 border-t border-gray-200">
              {authState.isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left bg-red-100 text-red-700 font-bold py-3 px-4 rounded-xl"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" className="text-center bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="text-center bg-lime-500 text-white font-bold py-3 px-4 rounded-xl">
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
};

export default Header;