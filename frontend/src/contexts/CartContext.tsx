import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types/Product';

// Extendemos Product para incluir el monto de reserva. Ya no hay 'quantity'.
interface CartItem extends Product {
  reservationAmount: number; // Con cuánto se separa la moto
}

// Estado del carrito
interface CartState {
  items: CartItem[];      // Productos en el carrito
  total: number;          // Suma de los montos de reserva
  itemCount: number;      // Cantidad de motos en el carrito (siempre será items.length)
}

// Acciones que puede hacer el carrito.
// Se elimina UPDATE_QUANTITY y se modifica el payload de ADD_TO_CART.
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; reservationAmount: number } } // Agregar producto con monto
  | { type: 'REMOVE_FROM_CART'; payload: number }       // Eliminar por ID
  | { type: 'CLEAR_CART' };                             // Vaciar carrito

// Crear el contexto
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

// Reducer: función que maneja los cambios del estado
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Buscar si el producto ya existe en el carrito
      const existingItem = state.items.find(item => item.id === action.payload.product.id);
      
      // Si el item ya existe, no hacemos nada para evitar duplicados.
      if (existingItem) {
        alert('Esta moto ya está en tu carrito.');
        return state;
      }
      
      // Si no existe, agregar el nuevo item con su monto de reserva
      const newItem: CartItem = {
        ...action.payload.product,
        reservationAmount: action.payload.reservationAmount,
      };

      const newItems = [...state.items, newItem];

      // Recalcular total (basado en reservationAmount) y contador
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.reservationAmount, 0),
        itemCount: newItems.length
      };
    }
    
    case 'REMOVE_FROM_CART': {
      // Filtrar para eliminar el producto
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.reservationAmount, 0),
        itemCount: newItems.length
      };
    }
    
    case 'CLEAR_CART':
      // Vaciar completamente el carrito
      return { items: [], total: 0, itemCount: 0 };
    
    default:
      return state;
  }
};

// Proveedor del contexto (envuelve toda la app)
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

// Exportar tipos para usar en otros archivos
export type { CartItem };
