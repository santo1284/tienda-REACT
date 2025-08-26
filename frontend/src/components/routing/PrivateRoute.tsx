import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  const { state } = useAuth();

  // Si está autenticado, renderiza el componente hijo (Outlet),
  // si no, redirige a la página de login.
  return state.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
