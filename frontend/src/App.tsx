import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Layout from './components/layout/Layout';

// Importar todas las páginas
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import Megusta from './pages/MeGustaPage'; 
import Detail from './pages/ProductDetailPage';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/gusta" element={<Megusta />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product/:id" element={<Detail />} />
            

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
      </Router>
    </FavoritesProvider>
    </CartProvider>

  );
}

export default App;