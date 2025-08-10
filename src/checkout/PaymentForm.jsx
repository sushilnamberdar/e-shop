import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { paymentAPI } from '../services/api';

export default function PaymentForm({ orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  

  async function onSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: 'if_required',
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Payment failed');
      return;
    }

    try {
      await paymentAPI.confirmPaymentSuccess(orderId, paymentIntent?.id);
      
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/order-confirmation/' + orderId;
      }, 2000);
    } catch (err) {
      console.error('Error updating payment status:', err);
      // Non-blocking, webhook should finalize anyway
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/order-confirmation/' + orderId;
      }, 2000);
    }
  }

  if (success) {
    return (
      <div className="text-center p-8">
        <div className="text-green-600 mb-4">
          <div className="text-4xl mb-2">✓</div>
          <p className="font-semibold text-lg">Payment Successful!</p>
          <p className="text-sm">Redirecting to order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    // <div className=" w-full max-w-md mx-auto">
      <form onSubmit={onSubmit} className="w-full ">
          <PaymentElement />
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {errorMsg}
          </div>
        )}
        
        <button 
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </span>
          ) : (
            'Pay Now'
          )}
        </button>
      </form>
    // </div>
  );
}



