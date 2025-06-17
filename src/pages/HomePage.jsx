import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

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
      <Hero/>
      <FeaturedProducts/>
      <Testimonials/>
      <Newsletter/>
      </div>
  );
};

export default HomePage;
