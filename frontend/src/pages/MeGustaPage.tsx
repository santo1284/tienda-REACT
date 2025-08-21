import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';

const MeGustaPage: React.FC = () => {
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();
  const { dispatch: cartDispatch } = useCart();

  const removeFromFavorites = (productId: number) => {
    favoritesDispatch({ type: 'REMOVE_FROM_FAVORITES', payload: productId });
  };

  const addToCart = (product: any) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const clearAllFavorites = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      favoritesDispatch({ type: 'CLEAR_FAVORITES' });
    }
  };

  // PÁGINA VACÍA
  if (favoritesState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto text-center">
            {/* ILUSTRACIÓN VACÍO */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-100 to-red-200 rounded-3xl flex items-center justify-center shadow-xl">
                <div className="text-6xl text-pink-400">💔</div>
              </div>
              {/* Elementos flotantes */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-lg">💨</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sin favoritos aún
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              No has agregado ninguna moto a tus favoritos. 
              Explora nuestro catálogo y marca las que más te gusten con el ❤️.
            </p>
            
            {/* BOTONES */}
            <div className="space-y-4">
              <Link 
                to="/products" 
                className="block w-full bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🏍️ Explorar Motos
              </Link>
              <Link 
                to="/" 
                className="block w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-200"
              >
                🏠 Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PÁGINA CON FAVORITOS
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        
        {/* HEADER DE LA PÁGINA */}
        <div className="mb-12">
          {/* BREADCRUMB */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-gray-700 transition-colors">Inicio</Link>
              <span>›</span>
              <span className="text-gray-900 font-medium">Mis Favoritos</span>
            </div>
          </nav>
          
          {/* TÍTULO Y ACCIONES */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                ❤️ Mis Favoritos
              </h1>
              <p className="text-gray-600">
                {favoritesState.itemCount} {favoritesState.itemCount === 1 ? 'moto favorita' : 'motos favoritas'}
              </p>
            </div>
            
            <button
              onClick={clearAllFavorites}
              className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-red-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Limpiar Todo</span>
            </button>
          </div>
        </div>
        
        {/* GRID DE PRODUCTOS FAVORITOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {favoritesState.items.map(product => (
            <div key={product.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-[1.02]">
              
              {/* IMAGEN DEL PRODUCTO */}
              <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-50 to-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* OVERLAY CON ACCIONES */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                    
                    {/* VER DETALLES */}
                    <Link
                      to={`/products/${product.id}`}
                      className="bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    
                    {/* AGREGAR AL CARRITO */}
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-lime-400 hover:bg-lime-500 text-black p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0h8" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* BOTÓN REMOVER DE FAVORITOS */}
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-red-500 p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* BADGE DE FAVORITO */}
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  ❤️ Favorito
                </div>
              </div>
              
              {/* INFORMACIÓN DEL PRODUCTO */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded-lg font-medium">
                        {product.category}
                      </span>
                      {product.brand && (
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg font-medium">
                          {product.brand}
                        </span>
                      )}
                      {product.year && (
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-lg font-medium">
                          {product.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* DESCRIPCIÓN */}
                {product.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}
                
                {/* PRECIO Y ACCIONES */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${(product.price * 1.15).toLocaleString()}
                    </span>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      -15%
                    </span>
                  </div>
                </div>
                
                {/* BOTONES DE ACCIÓN */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Link
                    to={`/products/${product.id}`}
                    className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">Ver</span>
                  </Link>
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center space-x-2 bg-lime-400 hover:bg-lime-500 text-black font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm">Carrito</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* ACCIONES ADICIONALES */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🔍 ¿Buscas algo específico?
            </h2>
            <p className="text-gray-600 mb-6">
              Explora todas nuestras motos y encuentra la perfecta para ti
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🏍️ Ver Todas las Motos
              </Link>
              
              <Link
                to="/cart"
                className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🛒 Ver Carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeGustaPage;