import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logowithout name.png'
import namelogo from '../assets/namelogo.png'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Back to top button */}
      <div className="bg-gray-800 py-4 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm hover:text-blue-400 transition-colors"
        >
          Back to top
        </button>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white">Press Releases</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-white">Community</Link></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><Link to="/sell" className="text-gray-400 hover:text-white">Sell products</Link></li>
              <li><Link to="/affiliate" className="text-gray-400 hover:text-white">Become an Affiliate</Link></li>
              <li><Link to="/advertise" className="text-gray-400 hover:text-white">Advertise Your Products</Link></li>
              <li><Link to="/vendor" className="text-gray-400 hover:text-white">Become a Vendor</Link></li>
            </ul>
          </div>

          {/* Payment Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Products</h3>
            <ul className="space-y-2">
              <li><Link to="/business-card" className="text-gray-400 hover:text-white">Business Card</Link></li>
              <li><Link to="/shop-points" className="text-gray-400 hover:text-white">Shop with Points</Link></li>
              <li><Link to="/reload-balance" className="text-gray-400 hover:text-white">Reload Your Balance</Link></li>
              <li><Link to="/currency-converter" className="text-gray-400 hover:text-white">Currency Converter</Link></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><Link to="/account" className="text-gray-400 hover:text-white">Your Account</Link></li>
              <li><Link to="/orders" className="text-gray-400 hover:text-white">Your Orders</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white">Shipping Rates & Policies</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-white">Returns & Replacements</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white">Help</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className=" flex items-center justify-center text-2xl font-bold text-white"><img src={logo} alt='logo' className='h-8'/> <img src={namelogo} alt='logo' className='h-8'/></Link>
            </div>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm">Conditions of Use</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Notice</Link>
              <Link to="/interest" className="text-gray-400 hover:text-white text-sm">Interest-Based Ads</Link>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">
            © 2024 ShopNow.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 