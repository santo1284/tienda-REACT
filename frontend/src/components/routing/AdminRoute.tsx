import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute: React.FC = () => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    // Si no está autenticado, redirigir a login
    return <Navigate to="/login" replace />;
  }

  if (state.user?.role !== 'admin') {
    // Si está autenticado pero no es admin, redirigir al inicio
    // o a una página de "Acceso Denegado". Por ahora, al inicio.
    return <Navigate to="/" replace />;
  }

  // Si está autenticado y es admin, renderiza el componente hijo
  return <Outlet />;
};

export default AdminRoute;
