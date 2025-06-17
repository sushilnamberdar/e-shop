import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Newsletter Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-8">
          <Mail className="h-8 w-8 text-emerald-600" />
        </div>

        {/* Content */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Stay in the Loop
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Be the first to know about new arrivals, exclusive deals, and special promotions. 
          Join our community of smart shoppers today!
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-emerald-600 font-bold">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Exclusive Deals</h3>
            <p className="text-sm text-gray-600">Access to subscriber-only discounts</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-blue-600 font-bold">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Early Access</h3>
            <p className="text-sm text-gray-600">Shop new collections before anyone else</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <span className="text-orange-600 font-bold">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Style Tips</h3>
            <p className="text-sm text-gray-600">Weekly styling and product guides</p>
          </div>
        </div>

        {/* Subscription Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={isSubscribed}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                isSubscribed
                  ? 'bg-green-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white transform hover:scale-105'
              }`}
            >
              {isSubscribed ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Subscribed!
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
        </form>

        {/* Privacy Note */}
        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe at any time. No spam, guaranteed.
        </p>

        {/* Social Proof */}
        <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full border-2 border-white"
              ></div>
            ))}
          </div>
          <span>Join 25,000+ subscribers</span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;