import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';

// Importar todas las páginas
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Megusta from './pages/MeGustaPage'; 
import Detail from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ServiciosPage from './pages/ServiciosPage'; // Importar ServiciosPage
import TallerPage from './pages/TallerPage'; // Importar TallerPage
import AlquilerPage from './pages/AlquilerPage'; // Importar AlquilerPage
import VenderPage from './pages/VenderPage';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/routing/AdminRoute';
import UserInboxPage from './pages/UserInboxPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
            <Layout>
              <Routes>
                {/* Rutas existentes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/gusta" element={<Megusta />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/product/:id" element={<Detail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Rutas Protegidas */}
                <Route element={<PrivateRoute />}>
                    <Route path="/vender" element={<VenderPage />} />
                    <Route path="/my-inbox" element={<UserInboxPage />} />
                </Route>
                <Route path="/admin" element={<AdminRoute />}>
                  <Route index element={<AdminDashboard />} />
                </Route>

                {/* Nuevas rutas de contenido */}
                <Route path="/servicios" element={<ServiciosPage />} />
                <Route path="/taller" element={<TallerPage />} />
                <Route path="/alquiler" element={<AlquilerPage />} />

                {/* Ruta Catch-all para 404 */}
                <Route path="*" element={
                  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🔍</div>
                      <h1 className="text-3xl font-bold text-gray-600 mb-4">
                        Página No Encontrada
                      </h1>
                      <p className="text-gray-500 mb-8">
                        La página que buscas no existe o fue movida.
                      </p>
                      <a
                        href="/"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        🏠 Volver al Inicio
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            </Layout>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;