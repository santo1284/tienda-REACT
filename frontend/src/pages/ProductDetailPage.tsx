import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../types/Product';
import { DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../utils/api';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactionFeedback, setTransactionFeedback] = useState('');

  // Función para validar ID de MongoDB
  const isValidMongoId = (id: string): boolean => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('ID de producto no válido');
        setLoading(false);
        return;
      }

      // Validar formato del ID
      if (!isValidMongoId(id)) {
        setError('El formato del ID del producto no es válido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        
        console.log('🔍 Buscando producto con ID:', id);

        // Usar la ruta de products que ahora sí existe
        const response = await api.get(`/products/${id}`);
        
        console.log('✅ Producto obtenido:', response.data);
        setProduct(response.data);
        
      } catch (err: any) {
        console.error('💥 Error al cargar producto:', err);
        
        if (err.response) {
          // El servidor respondió con un código de error
          const statusCode = err.response.status;
          const message = err.response.data?.message || 'Error del servidor';
          
          switch (statusCode) {
            case 404:
              setError('Producto no encontrado. Puede que haya sido eliminado o el ID sea incorrecto.');
              break;
            case 400:
              setError('El ID del producto no es válido.');
              break;
            case 500:
              setError('Error interno del servidor. Intenta nuevamente más tarde.');
              break;
            default:
              setError(`Error del servidor (${statusCode}): ${message}`);
          }
        } else if (err.request) {
          // La solicitud se hizo pero no se recibió respuesta
          setError('No se pudo conectar con el servidor. Verifica que esté ejecutándose en http://localhost:5000');
        } else {
          // Error al configurar la solicitud
          setError('Error de configuración: ' + err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCreateTransaction = async () => {
    if (!product) return;

    if (!authState.isAuthenticated) {
      navigate('/login');
      return;
    }

    if (window.confirm(`¿Confirmas la compra de ${product.name} por $${product.price.toLocaleString()}?`)) {
      setLoading(true);
      setTransactionFeedback('');
      
      try {
        const response = await api.post('/transactions', {
          itemId: product.id,
          itemTypeModel: 'Motorcycle',
          amountPaid: product.price,
          transactionType: 'Venta'
        });

        if (response.status === 200 || response.status === 201) {
          setTransactionFeedback('¡Felicidades! Un asesor se contactará contigo para finalizar la compra.');
          setProduct(prev => prev ? { ...prev, availability: 'sold' } : null);
        } else {
          throw new Error(response.data?.message || 'No se pudo procesar la transacción.');
        }

      } catch (err: any) {
        console.error('Error en transacción:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Error desconocido';
        setTransactionFeedback(`Error al procesar la compra: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-3xl flex items-center justify-center mb-6">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/products')}
              className="w-full bg-lime-400 hover:bg-lime-500 text-black font-bold py-3 px-6 rounded-2xl transition-all duration-200"
            >
              Ver todos los productos
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-2xl transition-all duration-200"
            >
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay producto (no debería pasar si hay loading y error states)
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Producto no encontrado.</p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP', 
      minimumFractionDigits: 0 
    }).format(price);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <button onClick={() => navigate('/products')} className="hover:text-lime-600 transition-colors">
                Productos
              </button>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Columna de Imagen */}
            <div className="relative">
              <img
                src={product.images && product.images.length > 0 ? product.images[0].url : '/images/placeholder.png'}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.png';
                }}
              />
              {product.availability !== 'available' && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-red-500 text-white px-6 py-3 rounded-2xl font-bold text-lg">
                    NO DISPONIBLE
                  </div>
                </div>
              )}
            </div>

            {/* Columna de Información */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                  <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 text-sm mb-8">
                  <div>
                    <p className="text-gray-500 font-medium">Marca</p>
                    <p className="font-semibold text-gray-900">{product.brand}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Modelo</p>
                    <p className="font-semibold text-gray-900">{product.model}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Año</p>
                    <p className="font-semibold text-gray-900">{product.year || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Cilindraje</p>
                    <p className="font-semibold text-gray-900">{product.cc}cc</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Condición</p>
                    <p className="font-semibold text-gray-900">{product.condition}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Kilometraje</p>
                    <p className="font-semibold text-gray-900">{product.km?.toLocaleString() || 0} km</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-lime-50 to-green-50 p-6 rounded-2xl mb-8">
                  <p className="text-4xl font-bold text-lime-600 mb-2">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-gray-600 font-medium">Precio final</p>
                </div>
              </div>

              <div>
                {transactionFeedback && (
                  <div className={`p-4 rounded-2xl mb-6 ${
                    transactionFeedback.startsWith('Error') 
                      ? 'bg-red-50 text-red-700 border border-red-200' 
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    <div className="flex items-center">
                      {transactionFeedback.startsWith('Error') ? (
                        <AlertCircle className="w-5 h-5 mr-2" />
                      ) : (
                        <CheckCircle className="w-5 h-5 mr-2" />
                      )}
                      {transactionFeedback}
                    </div>
                  </div>
                )}

                {product.availability === 'available' ? (
                  <button
                    onClick={handleCreateTransaction}
                    disabled={loading}
                    className="w-full bg-lime-500 text-white font-bold py-4 px-6 rounded-2xl hover:bg-lime-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    {loading ? 'Procesando...' : '🛒 Comprar Ahora'}
                  </button>
                ) : (
                  <div className="text-center p-6 bg-red-50 text-red-700 rounded-2xl font-semibold border border-red-200">
                    <AlertCircle className="w-6 h-6 mx-auto mb-2" />
                    No Disponible ({product.availability === 'sold' ? 'Vendido' : product.availability})
                  </div>
                )}

                {/* Información de contacto */}
                {product.contactNumber && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                    <p className="text-sm text-gray-600 mb-2">¿Tienes preguntas?</p>
                    <a 
                      href={`tel:${product.contactNumber}`}
                      className="text-lime-600 font-semibold hover:text-lime-700 transition-colors"
                    >
                      📞 {product.contactNumber}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;