import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import AddressesPage from './pages/AddressesPage';
import PaymentPage from './pages/PaymentPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

const AppRoutes = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <main className="mt-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/checkout/:orderId" element={<PaymentPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes; 