import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { productAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const { user, isLoggedIn, checkAuthStatus } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');


  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'Electronics', name: 'Electronics' },
    { id: 'Clothing', name: 'Clothing' },
    { id: 'Footwear', name: 'Footwear' },
    { id: 'Beauty', name: 'Beauty' },
    { id: 'Home', name: 'Home' },
    { id: 'Sports', name: 'Sports' },
    { id: 'Accessories', name: 'Accessories' }
  ];

  // fetch user if loged in or not 


  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const category = selectedCategory === 'all' ? null : selectedCategory;
      const data = await productAPI.getProducts(category);
      // console.log('Fetched products:', data.products);
      setProducts(data.products);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {

    if (!user) {
      toast.error('Please log in to add items to your cart');
      navigate("/login");
      return;
    }
    if (product.countInStock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 mt-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
        <button
          onClick={fetchProducts}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
      <div className='flex w-full items-center lg:hidden  justify-center mb-1'>
      <SearchBar query={searchQuery} setQuery={setSearchQuery} onSearch={fetchProducts} />
      </div>
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition ${selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            </Link>
            <div className="p-4">
              <Link
                to={`/products/${product._id}`}
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
              >
                {product.name}
              </Link>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`h-4 w-4 ${index < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>

              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.countInStock <= 0}
                  className={`p-2 rounded-full transition ${product.countInStock > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <FaShoppingCart className="h-5 w-5" />
                </button>
              </div>
              {!product.countInStock > 0 ? (
                <p className="text-red-500 text-sm mt-2">Out of Stock</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* No Products Found */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;