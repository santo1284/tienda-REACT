// types/Product.ts - Interfaz unificada para productos

export interface Product {
  km: string;
  id: number;
  name: string;
  price: number;
  pricePerHour?: number;
  image: string; // Siempre requerido, con fallback en el hook
  category: string;
  

  // Campos opcionales adicionales
  brand?: string;
  model?: string;
  year?: number;
  cc?: number;
  condition?: string;
  mileage?: number;
  location?: string;
  description?: string;
  contactNumber?: string;
  
  // Campos de imágenes adicionales
  images?: { url: string; public_id: string }[];
  
  // Campos de vendedor
  seller?: {
    name: string;
    email: string;
  };
  
  // Campos de rating y reviews
  rating?: number;
  numReviews?: number;
  
 // Estado de la publicación y disponibilidad
  status?: 'pending' | 'approved' | 'rejected' | 'sold';
  availability?: 'available' | 'sold' | 'reserved' | 'maintenance';
}

// Interfaz para la respuesta del backend
export interface ProductsResponse {
  motorcycles: any[]; // Raw data from backend
  page: number;
  pages: number;
  total: number;
}

// Interfaz para paginación
export interface PaginationInfo {
  page: number;
  pages: number;
  total: number;
}