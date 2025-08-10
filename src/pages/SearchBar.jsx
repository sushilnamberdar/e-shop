import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';

const SearchBar = ({ query, setQuery }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products once for local filtering
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getProducts(null);
        setAllProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Filter products as user types
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allProducts
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 5); // limit to 5 results
    setSuggestions(filtered);
  }, [query, allProducts]);

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {suggestions.map((product) => (
            <li key={product._id}>
              <Link
                to={`/products/${product._id}`}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                onClick={() => setSuggestions([])}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <span>{product.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
