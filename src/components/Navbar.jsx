import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logowithout name.png';
import namelogo from '../assets/namelogo.png';
import {
  FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt,
  FaLock, FaMapMarkerAlt, FaClipboardList
} from 'react-icons/fa';

const Navbar = () => {
  const { cartItems, cartCount = 0 } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop
  const mobileMenuRef = useRef(null);




  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);
  
  
  

  const handleLogout = () => {
    logout();
    setIsDesktopDropdownOpen(false);
    setIsMobileDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <img src={namelogo} alt="Name Logo" className="h-8 w-auto ml-2" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Products', 'About', 'Contact'].map((text) => (
              <Link key={text} to={`/${text.toLowerCase()}`} className="text-gray-700 hover:text-blue-600 transition duration-200">
                {text}
              </Link>
            ))}
            {user && (
              <Link to="/orders" className="text-gray-700 hover:text-blue-600 transition duration-200">Orders</Link>
            )}
          </div>

          {/* Desktop Cart + User */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-blue-600">
              <FaShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={desktopDropdownRef}>
                <button onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)} className="flex items-center text-gray-600 hover:text-blue-600">
                  <span className="mr-2 font-medium">{user?.name || 'User'}</span>
                  <FaUser className="h-6 w-6" />
                </button>

                {isDesktopDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {[
                      { icon: FaUser, text: 'Profile', path: '/profile' },
                      { icon: FaClipboardList, text: 'Orders', path: '/orders' },
                      { icon: FaMapMarkerAlt, text: 'Addresses', path: '/addresses' },
                      { icon: FaLock, text: 'Change Password', path: '/change-password' },
                    ].map(({ icon: Icon, text, path }) => (
                      <Link
                        key={text}
                        to={path}
                        onClick={() => setIsDesktopDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Icon className="mr-2" />
                        {text}
                      </Link>
                    ))}
                    <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 mr-4 text-gray-600 hover:text-blue-600">
              <FaShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-blue-600">
              {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}>
        <div className="px-4 pt-4 pb-3 space-y-1">
          {['Home', 'Products', 'About', 'Contact'].map((text) => (
            <Link key={text} to={`/${text.toLowerCase()}`} className="block px-3 py-2 rounded text-base text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              {text}
            </Link>
          ))}
          {user ? (
            <div ref={mobileDropdownRef}>
              <button onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)} className="flex items-center text-gray-600 hover:text-blue-600 w-full">
                <FaUser className="h-6 w-6" />
                <span className="ml-2 font-medium">{user?.name || 'User'}</span>
              </button>
              {isMobileDropdownOpen && (
                <div className="mt-2 w-full rounded-md bg-white shadow-md py-1">
                  {[
                    { icon: FaUser, text: 'Profile', path: '/profile' },
                    { icon: FaClipboardList, text: 'Orders', path: '/orders' },
                    { icon: FaMapMarkerAlt, text: 'Addresses', path: '/addresses' },
                    { icon: FaLock, text: 'Change Password', path: '/change-password' },
                  ].map(({ icon: Icon, text, path }) => (
                    <Link
                      key={text}
                      to={path}
                      onClick={() => setIsMobileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Icon className="mr-2" />
                      {text}
                    </Link>
                  ))}
                  <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
