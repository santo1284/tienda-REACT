import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Product, ProductsResponse, PaginationInfo } from '../types/Product';

// Custom hook para manejar productos
export const useProducts = () => {
  // Estados para productos, carga y errores
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    pages: 1,
    total: 0
  });

  // Función para obtener productos del backend
  const fetchProducts = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      console.log('🔄 Obteniendo productos desde /products...');
      
      // Construir query params
      const params = new URLSearchParams({
        pageNumber: page.toString(),
        ...filters
      });
      
      const response = await api.get(`/products?${params}`);
      console.log('✅ Respuesta del servidor:', response.data);
      
      // El backend devuelve { motorcycles, page, pages, total }
      const data: ProductsResponse = response.data;
      
      if (data.motorcycles && Array.isArray(data.motorcycles)) {
        // Mapear motorcycles para que coincidan con la interfaz Product
        const mappedProducts: Product[] = data.motorcycles.map((motorcycle: any) => ({
          id: motorcycle._id || motorcycle.id,
          name: motorcycle.name,
          price: motorcycle.price,
          category: motorcycle.category,
          // IMPORTANTE: Asegurar que image siempre tenga un valor
          image: motorcycle.images?.[0]?.url || motorcycle.image || 'https://via.placeholder.com/400x300.png?text=Sin+Imagen',
          brand: motorcycle.brand,
          model: motorcycle.model,
          year: motorcycle.year,
          cc: motorcycle.cc,
          condition: motorcycle.condition,
          mileage: motorcycle.mileage,
          km: motorcycle.mileage?.toString() || '0', // Convertir mileage a string para km
          location: motorcycle.location,
          description: motorcycle.description,
          images: motorcycle.images,
          seller: motorcycle.seller,
          rating: motorcycle.rating || 0,
          numReviews: motorcycle.numReviews || 0,
          status: motorcycle.status,
          // NUEVO: Mapear availability con fallback
          availability: motorcycle.availability || 'available'
        }));
        
        setProducts(mappedProducts);
        setPagination({
          page: data.page,
          pages: data.pages,
          total: data.total
        });
        
        console.log(`✅ ${mappedProducts.length} productos cargados correctamente`);
        setError(null);
      } else {
        console.error('❌ Estructura de respuesta inesperada:', data);
        setProducts([]);
        setError('La respuesta del servidor no contiene productos válidos');
      }
      
    } catch (err: any) {
      console.error('❌ Error obteniendo productos:', err);
      setProducts([]);
      
      if (err.response) {
        // Error de respuesta del servidor
        setError(`Error del servidor: ${err.response.status} - ${err.response.data?.message || err.message}`);
      } else if (err.request) {
        // Error de red
        setError('No se pudo conectar con el servidor. Verifica que esté funcionando en puerto 5000');
      } else {
        // Otro tipo de error
        setError(err.message || 'Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar al cargar el hook
  useEffect(() => {
    fetchProducts();
  }, []);

  // Retornar estados y funciones
  return {
    products,           // Lista de productos
    loading,           // Si está cargando
    error,             // Si hay error
    pagination,        // Información de paginación
    refetch: fetchProducts  // Función para recargar
  };
};