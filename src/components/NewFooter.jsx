import React from 'react';
import logo from '../assets/logowithout name.png';
import { ShoppingCart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const NewFooter = ({ 
  siteName = "Shopinity", 
  logoIcon: LogoIcon = ShoppingCart,
  logoImage,
  nameLogoImage
}) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center">
                {logoImage ? (
                  <div className="flex items-center">
                    <img 
                      src={logoImage} 
                      alt={`${siteName} logo`}
                      className="h-10 w-10 object-contain"
                    />
                    <span className="ml-3 text-xl font-bold">{siteName}</span>
                  </div>
                ) : nameLogoImage ? (
                  <img 
                    src={nameLogoImage} 
                    alt={`${siteName} logo`}
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                ) : (
                  <>
                    {/* <LogoIcon className="h-8 w-8 text-emerald-500" /> */}
                    <img src={logo} alt={`${siteName} logo`} className="h-10 w-auto object-contain" />
                    <span className="ml-2 text-xl font-bold">{siteName}</span>
                  </>
                )}
              </div>
              <p className="text-gray-300 leading-relaxed">
                Discover premium products that combine style, quality, and exceptional value. 
                Your satisfaction is our commitment.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-emerald-600 transition-colors duration-300">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Shop All', 'New Arrivals', 'Best Sellers', 'Sale Items', 'Gift Cards'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
              <ul className="space-y-3">
                {['Contact Us', 'FAQ', 'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'Track Your Order'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">123 Commerce Street</p>
                    <p className="text-gray-300">New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <p className="text-gray-300">hello@shopinity.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                  <p>Sat: 10:00 AM - 6:00 PM</p>
                  <p>Sun: 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Subscribe to get special offers, updates, and insider access.</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white placeholder-gray-400"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 {siteName}. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors duration-200">Cookie Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors duration-200">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter; 