import React from 'react';
import { useParams } from 'react-router-dom';
import Checkout from '../checkout/Checkout';

const StripeCheckoutPage = () => {
  const { orderId } = useParams();
  
  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Order</h1>
          <p className="text-gray-600">Order ID is missing. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Complete Payment</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Checkout orderId={orderId} />
        </div>
      </div>
    </div>
  );
};

export default StripeCheckoutPage;

