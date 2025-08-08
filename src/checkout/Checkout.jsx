import { useEffect, useMemo, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { paymentAPI } from '../services/api';

export default function Checkout({ orderId }) {
  const [clientSecret, setClientSecret] = useState(null);
  const [publishableKey, setPublishableKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function createIntent() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await paymentAPI.createPaymentIntent(orderId);
        setClientSecret(data.clientSecret);
        setPublishableKey(data.publishableKey);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        setError(error.message || 'Failed to initialize payment');
      } finally {
        setLoading(false);
      }
    }
    
    if (orderId) {
      createIntent();
    } else {
      setError('Order ID is required');
      setLoading(false);
    }
  }, [orderId]);

  const stripePromise = useMemo(() => {
    return publishableKey ? loadStripe(publishableKey) : null;
  }, [publishableKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Preparing payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">
          <p className="font-semibold">Payment Setup Error</p>
          <p className="text-sm">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!clientSecret || !stripePromise) {
    return (
      <div className="text-center p-8">
        <p>Unable to initialize payment. Please try again.</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm orderId={orderId} />
    </Elements>
  );
}




