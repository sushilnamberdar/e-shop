import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import CheckoutPage from './pages/CheckoutPage';
import StripeCheckoutPage from './pages/StripeCheckoutPage';
import AboutPage from './staticpage/AboutPage';
import ContactPage from './staticpage/ContactPage';
import SupportPage from './staticpage/SupportPage';
import NotFound from './staticpage/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './context/CartContext';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetailPage from './pages/ProductDetailPage';
import Orders from './pages/Orders';
import EmailVerification from './pages/EmailVerification';
import OrderConfirmation from './pages/OrderConfirmation';
import Header from './components/Header';
import NewFooter from './staticpage/NewFooter';
import FeaturedProductDetailsPage from './pages/FeaturedProductDetails';
import ScrollToTop from './components/ScrollToTop';
import AddressPage from './pages/AddressPage';

function App() {
  return (
    <CartProvider>
      <ScrollToTop/>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* <Navbar /> */}
        <Header/>
        <main className="flex-grow container mx-auto px-4 py-6 mt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path='/home' element={<HomePage/>}/>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/featured/:id" element={<FeaturedProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/login" element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            } />
            <Route path="/register" element={
              <ProtectedRoute requireAuth={false}>
                <RegisterPage />
              </ProtectedRoute>
            } />

            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/addresses" element={
              <ProtectedRoute>
                <AddressPage/>
              </ProtectedRoute>
            } />
            <Route path="/change-password" element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            } />
            <Route path="/checkout/:orderId" element={
              <ProtectedRoute>
                <StripeCheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify-email" element={
              <ProtectedRoute>
                <EmailVerification />
              </ProtectedRoute>
            } />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />

            {/* Catch all route - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <NewFooter/>
        <ToastContainer />
      </div>
    </CartProvider>
  );
}

export default App; 