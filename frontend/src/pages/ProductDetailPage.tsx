import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext'; // Importar useAuth

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  image: string;
  additionalImages: string[];
  category: string;
  year: number;
  cc: number;
  mileage: number;
  condition: string;
  transmission: string;
  fuel: string;
  description: string;
  seller: string;
  availability: string;
  reservationPrice: number;
  features: string[];
  included: string[];
  reviews: Review[];
  averageRating: number;
  location: string;
  sellerRating: number;
  sellerVerified: boolean;
  negotiable: boolean;
  originalPrice?: number;
  reservedBy?: string;
  reservedDate?: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: dispatchFavorites, isFavorite } = useFavorites();
  const { state: authState } = useAuth(); // Usar el estado de autenticación
  
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [reservationAmount, setReservationAmount] = useState(0);
  const [minReservation, setMinReservation] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        
        const data = await response.json();
        setProduct(data);
        
        const minAmount = Math.max(data.reservationPrice * 0.5, 100000);
        setMinReservation(minAmount);
        setReservationAmount(data.reservationPrice);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Botón "Añadir al Carrito" - usa el precio de reserva por defecto
  const handleAddToCart = () => {
    if (product) {
      cartDispatch({
        type: 'ADD_TO_CART', 
        payload: {
          product: product,
          reservationAmount: product.reservationPrice // Usa el precio de reserva por defecto
        }
      });
      
      const button = document.getElementById('add-to-cart-btn');
      if (button) {
        button.classList.add('animate-pulse');
        setTimeout(() => button.classList.remove('animate-pulse'), 600);
      }
    }
  };

  // Botón "Separar Ahora" - abre el modal
  const handleReserveVehicle = () => {
    if (product && product.availability === 'Disponible') {
      setShowReservationModal(true);
    }
  };

  // Confirmación desde el modal de reserva
  const handleReservationConfirm = () => {
    if (product) {
      // TODO: Aquí iría la lógica de API si se necesitara confirmar la reserva en el backend

      cartDispatch({
        type: 'ADD_TO_CART',
        payload: {
          product: product,
          reservationAmount: reservationAmount // Usa el monto seleccionado en el modal
        }
      });

      setShowReservationModal(false);
      navigate('/cart'); // Lleva al usuario al carrito para que vea lo que agregó
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      dispatchFavorites({ type: 'TOGGLE_FAVORITE', payload: product });
    }
  };

  const handleSubmitReview = async () => {
    if (product && newReview.comment.trim() && authState.isAuthenticated) {
      setSubmittingReview(true);
      
      // TODO: Reemplazar con llamada a la API real
      try {
        const localReview: Review = {
          id: Date.now(),
          user: authState.user?.name || "Usuario Anónimo", // Usar nombre del usuario autenticado
          rating: newReview.rating,
          comment: newReview.comment,
          date: new Date().toISOString().split('T')[0],
          verified: true // Suponemos que el usuario logueado está verificado
        };
        
        setProduct(prev => {
          if (!prev) return null;
          const updatedReviews = [localReview, ...prev.reviews];
          const newAvg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          
          return {
            ...prev,
            reviews: updatedReviews,
            averageRating: parseFloat(newAvg.toFixed(1))
          };
        });
        
        setNewReview({ rating: 5, comment: '' });
        setShowReviewModal(false);
      } catch (err) {
        console.error('Error al enviar reseña:', err);
      } finally {
        setSubmittingReview(false);
      }
    } else if (!authState.isAuthenticated) {
      alert("Debes iniciar sesión para dejar una reseña.");
      navigate('/login');
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        onClick={() => interactive && onStarClick && onStarClick(i + 1)}
        disabled={!interactive}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
      >
        <svg
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'} ${interactive ? 'hover:text-yellow-300' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      </button>
    ));
  };

  const getConditionColor = (condition: string) => {
    const colors = {
      'Nueva': 'bg-green-100 text-green-800',
      'Seminueva': 'bg-blue-100 text-blue-800',
      'Usada': 'bg-yellow-100 text-yellow-800'
    };
    return colors[condition as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-lime-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando información del vehículo...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-3xl font-bold text-gray-600 mb-4">
            {error || 'Vehículo no encontrado'}
          </h1>
          <button 
            onClick={() => navigate('/products')}
            className="bg-lime-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-lime-600 transition-colors"
          >
            Ver Todos los Vehículos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <button onClick={() => navigate('/')} className="text-gray-700 hover:text-lime-600">
                Inicio
              </button>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <button onClick={() => navigate('/products')} className="ml-1 text-gray-700 hover:text-lime-600">
                  Vehículos
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="ml-1 text-gray-500 truncate">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            
            {/* GALERÍA DE IMÁGENES */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={product.additionalImages && product.additionalImages.length > 0 
                    ? product.additionalImages[selectedImage] || product.image 
                    : product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600?text=Vehículo';
                  }}
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.additionalImages && product.additionalImages.length > 0 ? (
                  product.additionalImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-lime-500 ring-2 ring-lime-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150?text=Img';
                        }}
                      />
                    </button>
                  ))
                ) : (
                  // Fallback: mostrar solo la imagen principal repetida
                  [0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(0)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-lime-500 ring-2 ring-lime-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={`Vista ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150?text=Img';
                        }}
                      />
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* INFORMACIÓN DEL PRODUCTO */}
            <div className="space-y-6">
              
              {/* Encabezado */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="bg-lime-100 text-lime-800 px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(product.condition)}`}>
                      {product.condition}
                    </span>
                    {product.negotiable && (
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        Negociable
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleToggleFavorite}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                    </svg>
                  </button>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex space-x-1">
                    {renderStars(Math.floor(product.averageRating || 0))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.averageRating || 0}) • {product.reviews ? product.reviews.length : 0} reseñas
                  </span>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="text-lime-600 text-sm font-medium hover:text-lime-700"
                  >
                    Calificar
                  </button>
                </div>
              </div>

              {/* Precio */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Estado:</span>
                    <span className={`text-sm font-semibold ${
                      product.availability === 'Disponible' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.availability}
                    </span>
                    {product.availability === 'Reservada' && product.reservedBy && (
                      <span className="text-xs text-gray-500">
                        por {product.reservedBy}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">📍</span>
                    <span className="text-sm text-gray-700">{product.location}</span>
                  </div>
                  
                  {product.availability === 'Disponible' && (
                    <div className="bg-lime-50 border border-lime-200 rounded-lg p-3">
                      <p className="text-sm text-lime-700">
                        <span className="font-semibold">💰 Separa este vehículo por:</span> ${product.reservationPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-lime-600 mt-1">
                        El resto se paga al momento de la entrega
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Controles de reserva y carrito */}
              {product.availability === 'Disponible' && (
                <div className="space-y-4">
                  {/* Botón Agregar al Carrito */}
                  <button
                    id="add-to-cart-btn"
                    onClick={handleAddToCart}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 mb-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.24a2 2 0 00-2-2v0a2 2 0 00-2 2v0l-2.68-4.24m5.36 0l1.68 4.24a2 2 0 002 2v0a2 2 0 002-2v0l-1.68-4.24"/>
                    </svg>
                    <span>Agregar al Carrito</span>
                  </button>

                  {/* Separador */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">o</span>
                    </div>
                  </div>

                  {/* Botón Separar Vehículo */}
                  <button
                    id="reserve-btn"
                    onClick={handleReserveVehicle}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    <span>Separar Vehículo Ahora</span>
                  </button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      🛒 Carrito: Revisa antes de separar • 🔐 Separar: Reserva inmediata
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      💰 Desde ${minReservation.toLocaleString()} para separar
                    </p>
                  </div>
                </div>
              )}

              {product.availability === 'Reservada' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <span className="text-red-700 font-semibold">⚠️ Este vehículo ya está reservado</span>
                  {product.reservedDate && (
                    <p className="text-sm text-red-600 mt-1">
                      Reservado el {formatDate(product.reservedDate)}
                    </p>
                  )}
                  <button
                    onClick={() => navigate('/products')}
                    className="block w-full mt-3 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Ver Otros Vehículos
                  </button>
                </div>
              )}

              {/* Información del vendedor */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Vendedor</h3>
                <p className="text-gray-700 mb-2">{product.seller}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>📍 {product.location}</span>
                  {product.sellerVerified && <span className="text-green-600">✅ Verificado</span>}
                  <span>⭐ {product.sellerRating}/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* TABS DE INFORMACIÓN */}
          <div className="border-t border-gray-200">
            <div className="flex space-x-8 px-8 pt-8">
              {['details', 'features', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 border-b-2 font-medium transition-colors ${
                    activeTab === tab
                      ? 'border-lime-500 text-lime-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'details' && 'Especificaciones'}
                  {tab === 'features' && 'Incluye'}
                  {tab === 'reviews' && `Reseñas (${product.reviews ? product.reviews.length : 0})`}
                </button>
              ))}
            </div>

            <div className="px-8 py-6">
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Técnica</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Año:</span>
                        <span className="font-medium">{product.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cilindraje:</span>
                        <span className="font-medium">{product.cc} cc</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kilometraje:</span>
                        <span className="font-medium">
                          {product.mileage === 0 ? 'Nuevo (0 km)' : `${product.mileage.toLocaleString()} km`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estado:</span>
                        <span className="font-medium">{product.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transmisión:</span>
                        <span className="font-medium">{product.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Combustible:</span>
                        <span className="font-medium">{product.fuel}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Descripción</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Características</h3>
                    <ul className="space-y-2">
                      {product.features && product.features.length > 0 ? (
                        product.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-lime-600 font-bold">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No se especificaron características</li>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">La venta incluye</h3>
                    <ul className="space-y-2">
                      {product.included && product.included.length > 0 ? (
                        product.included.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-lime-600 font-bold">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No se especificaron elementos incluidos</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Reseñas de compradores ({product.reviews ? product.reviews.length : 0})
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {renderStars(Math.floor(product.averageRating || 0))}
                      </div>
                      <span className="text-sm text-gray-500">{product.averageRating || 0} de 5</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="bg-lime-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-lime-600 transition-colors"
                  >
                    Escribir Reseña
                  </button>

                  <div className="space-y-4">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold">
                                  {review.user.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium text-gray-900">{review.user}</p>
                                  {review.verified && (
                                    <span className="text-green-600 text-xs">✅ Verificado</span>
                                  )}
                                </div>
                                <div className="flex space-x-1">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                          </div>
                          <p className="text-gray-700 ml-13">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No hay reseñas aún. ¡Sé el primero en calificar!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal para separar vehículo con monto personalizable */}
        {showReservationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Separar Vehículo</h3>
                <p className="text-gray-600">{product.name}</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Con cuánto quieres separar la moto?
                </label>
                
                <div className="space-y-3">
                  {/* Monto sugerido por defecto */}
                  <button
                    onClick={() => setReservationAmount(product.reservationPrice)}
                    className={`w-full p-3 border-2 rounded-lg text-left transition-colors ${
                      reservationAmount === product.reservationPrice
                        ? 'border-lime-500 bg-lime-50 text-lime-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Monto recomendado</span>
                      <span className="text-lg font-bold">${product.reservationPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {((product.reservationPrice / product.price) * 100).toFixed(0)}% del precio total
                    </p>
                  </button>

                  {/* Monto mínimo */}
                  <button
                    onClick={() => setReservationAmount(minReservation)}
                    className={`w-full p-3 border-2 rounded-lg text-left transition-colors ${
                      reservationAmount === minReservation
                        ? 'border-lime-500 bg-lime-50 text-lime-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Monto mínimo</span>
                      <span className="text-lg font-bold">${minReservation.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {((minReservation / product.price) * 100).toFixed(0)}% del precio total
                    </p>
                  </button>

                  {/* Monto personalizado */}
                  <div className="border-2 border-gray-200 rounded-lg p-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monto personalizado
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        min={minReservation}
                        max={product.price}
                        value={reservationAmount}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || minReservation;
                          setReservationAmount(Math.max(minReservation, Math.min(value, product.price)));
                        }}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        placeholder={minReservation.toString()}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Entre ${minReservation.toLocaleString()} y ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-lime-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Separas con:</span>
                    <span className="font-semibold text-lime-700">${reservationAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pagas al entregar:</span>
                    <span className="font-semibold">${(product.price - reservationAmount).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowReservationModal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReservationConfirm}
                  className="flex-1 bg-lime-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-lime-600 transition-colors"
                >
                  Separar y Ir al Carrito
                </button>
              </div>
            </div>
          </div>
        )}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Calificar Producto</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tu calificación:</label>
                <div className="flex space-x-1">
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tu comentario:</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Comparte tu experiencia con este vehículo..."
                  className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={!newReview.comment.trim() || submittingReview}
                  className="flex-1 bg-lime-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-lime-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {submittingReview && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  <span>{submittingReview ? 'Enviando...' : 'Enviar Reseña'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;