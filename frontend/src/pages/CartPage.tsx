import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const CartPage: React.FC = () => {
  const { state: cartState, dispatch } = useCart();
  const { state: authState } = useAuth();
  const navigate = useNavigate();

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const clearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  const handleCheckout = () => {
    if (!authState.isAuthenticated) {
      alert('Debes iniciar sesión para proceder con la separación.');
      navigate('/login');
    } else {
      // Lógica de pago o siguiente paso
      alert(`¡Gracias por tu confianza, ${authState.user?.name}! Serás redirigido para completar el pago de tu separación.`);
      // TODO: Integrar pasarela de pagos
    }
  };

  // CARRITO VACÍO
  if (cartState.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-xl">
                <div className="text-6xl text-gray-400">🏍️</div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-lg">💨</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Aún no has separado ninguna moto
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Explora nuestro catálogo de motos. ¡La moto de tus sueños te espera!
            </p>
            <div className="space-y-4">
              <Link 
                to="/products" 
                className="block w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🏍️ Ver Motos Disponibles
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CARRITO CON PRODUCTOS
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-gray-700 transition-colors">Inicio</Link>
              <span>›</span>
              <span className="text-gray-900 font-medium">Carrito de Separación</span>
            </div>
          </nav>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🏍️ Tu Carrito de Separación
              </h1>
              <p className="text-gray-600">
                Tienes {cartState.itemCount} {cartState.itemCount === 1 ? 'moto' : 'motos'} lista para separar.
              </p>
            </div>
            <button
              onClick={clearCart}
              className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-red-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Vaciar Carrito</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            {cartState.items.map(item => (
              <div key={item.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Precio total: ${item.price.toLocaleString()}
                        </p>
                        <div className="bg-lime-50 border border-lime-200 rounded-lg p-3">
                          <p className="text-sm text-lime-800">
                            <span className="font-semibold">Monto a Separar:</span> ${item.reservationAmount.toLocaleString()}
                          </p>
                          <p className="text-xs text-lime-700 mt-1">
                            Saldo restante: ${(item.price - item.reservationAmount).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center space-x-2 text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="text-sm">Quitar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  📋 Resumen de Separación
                </h2>
                <p className="text-gray-600">
                  Total a pagar para separar tu(s) moto(s).
                </p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Monto de separación ({cartState.itemCount} {cartState.itemCount === 1 ? 'moto' : 'motos'})</span>
                  <span className="font-semibold text-gray-900">
                    ${cartState.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Costos de gestión</span>
                  <span className="font-semibold text-green-600">GRATIS</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center py-2">
                  <span className="text-xl font-bold text-gray-900">Total a Pagar Hoy</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${cartState.total.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>💳 Proceder a la Separación</span>
                </button>
                <Link 
                  to="/products"
                  className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-2xl transition-all duration-200"
                >
                  🛍️ Seguir Viendo Motos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;