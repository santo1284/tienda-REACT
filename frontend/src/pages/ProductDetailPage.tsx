import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../types/Product'; // Usaremos nuestro tipo de producto principal
import { DollarSign, CheckCircle } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactionFeedback, setTransactionFeedback] = useState('');


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        // El endpoint para un solo producto necesita ser verificado. Asumimos que existe
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Vehículo no encontrado o no disponible.');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar el producto.');
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
        const response = await fetch('/api/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authState.token}`
          },
          body: JSON.stringify({
            itemId: product.id,
            itemTypeModel: 'Motorcycle', // Este es un producto de venta
            amountPaid: product.price, // Asumimos pago completo
            transactionType: 'Venta'
          })
        });

        const data = await response.json();

        if (response.ok) {
          setTransactionFeedback('¡Felicidades! Un asesor se contactará contigo para finalizar la compra.');
          // Actualizar el estado del producto localmente para reflejar el cambio
          setProduct(prev => prev ? { ...prev, availability: 'sold' } : null);
        } else {
          throw new Error(data.message || 'No se pudo procesar la transacción.');
        }

      } catch (err: any) {
        setTransactionFeedback(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div className="text-center p-10">Cargando...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center p-10">Producto no encontrado.</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Columna de Imagen */}
          <div>
            <img
              src={product.images && product.images.length > 0 ? product.images[0].url : '/images/placeholder.png'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Columna de Información */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <p><span className="font-semibold">Marca:</span> {product.brand}</p>
                <p><span className="font-semibold">Modelo:</span> {product.model}</p>
                <p><span className="font-semibold">Año:</span> {product.year}</p>
                <p><span className="font-semibold">Cilindraje:</span> {product.cc}cc</p>
                <p><span className="font-semibold">Condición:</span> {product.condition}</p>
                <p><span className="font-semibold">Kilometraje:</span> {product.mileage?.toLocaleString() || 0} km</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-3xl font-bold text-lime-600 flex items-center">
                  <DollarSign className="mr-2" /> {product.price.toLocaleString('es-CO')}
                </p>
                <p className="text-gray-500">Precio final</p>
              </div>
            </div>

            <div className="mt-6">
              {transactionFeedback && (
                <div className={`p-4 rounded-md mb-4 ${transactionFeedback.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {transactionFeedback}
                </div>
              )}

              {product.availability === 'available' ? (
                <button
                  onClick={handleCreateTransaction}
                  disabled={loading}
                  className="w-full bg-lime-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-lime-600 transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? 'Procesando...' : 'Comprar Ahora'}
                </button>
              ) : (
                <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg font-semibold">
                  No Disponible ({product.availability})
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;