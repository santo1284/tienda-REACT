import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types/Product';

// Estados y acciones para favoritos
interface FavoritesState {
  items: Product[];
  itemCount: number;
}

type FavoritesAction =
  | { type: 'ADD_TO_FAVORITES'; payload: Product }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: number }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'TOGGLE_FAVORITE'; payload: Product };

interface FavoritesContextType {
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
  isFavorite: (productId: number) => boolean;
}

// Estado inicial
const initialState: FavoritesState = {
  items: [],
  itemCount: 0,
};

// Reducer
const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      // Verificar si ya existe
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      
      const newItemsAdd = [...state.items, action.payload];
      return {
        items: newItemsAdd,
        itemCount: newItemsAdd.length,
      };

    case 'REMOVE_FROM_FAVORITES':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: filteredItems,
        itemCount: filteredItems.length,
      };

    case 'TOGGLE_FAVORITE':
      const exists = state.items.some(item => item.id === action.payload.id);
      
      if (exists) {
        // Remover si ya existe
        const filteredItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          items: filteredItems,
          itemCount: filteredItems.length,
        };
      } else {
        // Agregar si no existe
        const newItems = [...state.items, action.payload];
        return {
          items: newItems,
          itemCount: newItems.length,
        };
      }

    case 'CLEAR_FAVORITES':
      return initialState;

    default:
      return state;
  }
};

// Crear contexto
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider
interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const isFavorite = (productId: number): boolean => {
    return state.items.some(item => item.id === productId);
  };

  const value: FavoritesContextType = {
    state,
    dispatch,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export type { Product, FavoritesState, FavoritesAction };