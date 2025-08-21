import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logowithout name.png'; // Adjust the path as necessary
import nameLogo from '../assets/namelogo.png'; // Adjust the path as necessary
import {
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  Lock,
  MapPin,
  List,
  ClipboardList,
  Search,
} from 'lucide-react';
import SearchBar from '../pages/SearchBar';
import { toast } from 'react-toastify';

const Navbar = ({
  siteName = "Shopinity",
  logoIcon: LogoIcon = ShoppingCart,
  logoImage,
  nameLogoImage
}) => {
  const { cartItems, cartCount = 0 } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const desktopDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop profile dropdown on outside click or Escape
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (event) => {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  // Close mobile menu on outside click or Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event) => {
      const target = event.target;
      const clickedInsideMenu = mobileMenuRef.current && mobileMenuRef.current.contains(target);
      const clickedToggleButton = mobileMenuButtonRef.current && mobileMenuButtonRef.current.contains(target);
      if (!clickedInsideMenu && !clickedToggleButton) {
        setIsMenuOpen(false);
        setIsMobileDropdownOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsMobileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully!");
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleNavigation = (path) => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" >
            <div className="flex justify-center items-center">
              <img src={logo} className=" w-8" />
              <img src={nameLogo} className="w-28 mt-2" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-900 hover:text-emerald-600 transition-colors duration-200 font-medium">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium">Shop</Link>
            <Link to="/cart" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium">Cart</Link>
            <Link to="/about" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium">Contact</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-72 md:hidden lg:flex lg:ml-1">
              <SearchBar query={searchQuery} setQuery={setSearchQuery} />
            </div>
            {user ? (
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                >
                  <div className='flex items-center space-x-4'>
                    <User className="h-5 w-5" /> {user.name || 'User'}
                  </div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                      onClick={() => handleNavigation('/profile')}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-gray-100"
                    >
                      <User className="mr-2" /> Profile
                    </button>

                    <button
                      onClick={() => handleNavigation('/orders')}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <List className="mr-2" /> Orders
                    </button>

                    <button
                      onClick={() => handleNavigation('/addresses')}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <MapPin className="mr-2" /> Addresses
                    </button>

                    <button
                      onClick={() => handleNavigation('/change-password')}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Lock className="mr-2" /> Change Password
                    </button>
                    <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
                      <LogOut className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                <User className="h-5 w-5" />
              </Link>
            )}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" ref={mobileMenuRef}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {/* Mobile Search */}
              <div className="px-1 py-2">
                <SearchBar query={searchQuery} setQuery={setSearchQuery} />
              </div>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-900 hover:text-emerald-600 font-medium">Home</Link>
              <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium">Shop</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium">About</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium">Contact</Link>

              {user ? (
                <>
                  <button
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                    className="flex items-center w-full px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium"
                  >
                    <User className="h-5 w-5 mr-2" /> {user.name || 'User'}
                  </button>

                  {isMobileDropdownOpen && (
                    <div className="mt-1 space-y-1 bg-gray-50 rounded-lg p-2">
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
                        <User className="mr-2" /> Profile
                      </Link>
                      <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
                        <ClipboardList className="mr-2" /> Orders
                      </Link>
                      <Link to="/addresses" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
                        <MapPin className="mr-2" /> Addresses
                      </Link>
                      <Link to="/change-password" onClick={() => setIsMenuOpen(false)} className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
                        <Lock className="mr-2" /> Change Password
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
                      >
                        <LogOut className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-emerald-600 font-medium">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
