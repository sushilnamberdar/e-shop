import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = React.useState(false);
  const viewallproduct = () => {
    navigate('/products'); // Navigate to the products page
  }
  return (
    <>
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-2 animate-pulse"></span>
                  New Collection Available
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Your
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"> Perfect Style</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Explore our curated collection of premium products designed to elevate your lifestyle. Quality craftsmanship meets modern design.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={viewallproduct} className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button onClick={() => setShowVideo(true)} className="group border-2 border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Story
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">99%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-3xl opacity-20 blur-3xl transform rotate-6"></div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fashion Model"
                  className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>

                {/* Floating Cards */}
                <div className="absolute top-8 right-8 bg-white p-4 rounded-xl shadow-lg backdrop-blur-sm animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-bold">★</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">4.9/5</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg backdrop-blur-sm animate-float-delayed">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">🚚</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Free Shipping</div>
                      <div className="text-sm text-gray-600">On orders $100+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg shadow-lg p-4 relative max-w-2xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
              onClick={() => setShowVideo(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/sX4kCChsFKg?si=c4a8eGA1AWgnkKnD"
                title="Watch Story"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;

