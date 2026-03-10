import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Men from './pages/Men';
import Women from './pages/Women';
import Collections from './pages/Collections';
import About from './pages/About';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import ProductDetails from './pages/ProductDetails';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="collections" element={<Collections />} />
              <Route path="men" element={<Men />} />
              <Route path="women" element={<Women />} />
              <Route path="about" element={<About />} />
              <Route path="product/:id" element={<ProductDetails />} />

              <Route path="admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route path="admin" element={<Admin />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;