import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import { FaSearch, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Keep input in sync when URL changes externally
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await productAPI.getProducts(null);
        setAllProducts(data.products || []);
      } catch (err) {
        console.error('Search fetch error:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return allProducts;
    const q = query.toLowerCase();
    return allProducts.filter((p) => {
      const name = p.name?.toLowerCase() || '';
      const category = p.category?.toLowerCase() || '';
      const desc = p.description?.toLowerCase() || '';
      return name.includes(q) || category.includes(q) || desc.includes(q);
    });
  }, [allProducts, query]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  const handleAddToCart = (product) => {
    if (product.countInStock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart(product, 1);
    toast.success('Added to cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
      <div className="mb-6">
        <form onSubmit={onSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              No results{query ? ` for "${query}"` : ''}.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <Link to={`/products/${product._id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${product._id}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
                      {product.name}
                    </Link>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={`h-4 w-4 ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.countInStock <= 0}
                        className={`p-2 rounded-full transition ${
                          product.countInStock > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;


