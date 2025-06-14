import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';

const demoProducts = [
  {
    _id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '2',
    name: 'Smart Watch',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '3',
    name: 'Bluetooth Speaker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    _id: '4',
    name: 'DSLR Camera',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
];
const HomePage = () => {
  const [user,setUser]=  useState(null)

  useEffect(()=>{
    const token = cookie.get('token');
    setUser(token);

  },[])

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-8 mb-8 shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-2">Welcome to E-Shop</h1>
        <p className="text-lg mb-4">Find the best products at unbeatable prices!</p>
        {!user && (
         <Link to="/register" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition">Sign Up Now</Link>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {demoProducts.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col items-center">
            <img
              src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
              alt={product.name}
              className="w-40 h-40 object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-blue-600 font-bold text-xl mb-2">${product.price.toFixed(2)}</p>
            <Link to={`/product/${product._id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
