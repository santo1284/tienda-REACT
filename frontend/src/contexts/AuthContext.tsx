import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// Interfaz para la información del usuario
interface User {
  id: string;
  name: string;
  email: string;
}

// Estado de autenticación
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Acciones de autenticación
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' };

// Crear el contexto
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | undefined>(undefined);

// Reducer para manejar el estado de autenticación
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // Guardar token en localStorage para persistir la sesión
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

// Estado inicial: intenta cargar desde localStorage
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Efecto para cargar el estado desde localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if (token && userString) {
      const user = JSON.parse(userString);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
