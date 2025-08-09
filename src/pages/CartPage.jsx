import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { orderAPI, getAddresses } from '../services/api';
import { toast } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';
import emptycartimg from '../assets/emptycart.json'

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, loading } = useCart();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  

  // Load latest 3 addresses
  useEffect(() => {
    let isMounted = true;
    async function fetchAddresses() {
      try {
        setAddressesLoading(true);
        const res = await getAddresses();
        const list = res?.data?.addresses || [];
        // Keep the most recent 3
        const latestThree = list.slice(-3);
        if (!isMounted) return;
        setAddresses(latestThree);
        if (latestThree.length > 0) {
          setSelectedAddressId(latestThree[latestThree.length - 1]._id);
        }
      } catch (err) {
        console.error('Failed to load addresses:', err);
        if (isMounted) toast.error('Failed to load addresses');
      } finally {
        if (isMounted) setAddressesLoading(false);
      }
    }
    fetchAddresses();
    return () => { isMounted = false; };
  }, []);

  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    // Validate address selection
    const chosenAddress = addresses.find(a => a._id === selectedAddressId);
    if (!chosenAddress) {
      toast.error('Please select a delivery address.');
      return;
    }

    try {
      setCheckoutLoading(true);
      
      // Calculate total
      const orderTotal = getCartTotal();
      
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          name: `${chosenAddress.firstName || ''} ${chosenAddress.lastName || ''}`.trim() || 'NA',
          address: chosenAddress.street || chosenAddress.address || 'NA',
          city: chosenAddress.city || chosenAddress.state || 'NA',
          state: chosenAddress.state || 'NA',
          zipCode: chosenAddress.zip || chosenAddress.postalCode || chosenAddress.zipCode || 'NA',
          phone: String(chosenAddress.number || chosenAddress.phone || 'NA')
        },
        totalAmount: orderTotal,
        // Must be one of: 'credit_card' | 'debit_card'
        paymentMethod
      };

      // Create order
      const order = await orderAPI.createOrder(orderData);
      
      // Navigate next step
      const createdOrderId = order?.order?._id || order?.orderId || order?._id;
      if (createdOrderId) {
        if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
          toast.success('Order created. Redirecting to payment...');
          navigate(`/checkout/${createdOrderId}`);
        } 
      } else {
        toast.error('Order created but ID missing.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(error.message || 'Failed to create order. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow">
                <div className="w-24 h-24 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-24 h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-br from-emerald-50 via-white to-blue-100">
      {
        cartItems.length > 0 &&
        <h2 className="text-2xl ml-2 font-bold mb-6">Shopping Cart</h2>

      }
      {cartItems.length === 0 ? (
        <div
          className="text-center py-12 w-full min-h-screen"
        >
          <Player
            autoplay
            loop
            src={emptycartimg}
            style={{ height: '300px', width: '300px', margin: '0 auto' }}
          />
          <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-700">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <button
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => navigate('/products')}
          >
            Shop Products
          </button>
        
        </div>
      ) : (
        <div className=" m-5 mb-5 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div key={item._id} className="p-6 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-1 text-gray-600 hover:text-blue-600"
                        >
                          <FaMinus />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-1 text-gray-600 hover:text-blue-600"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${typeof item.price === 'number' ? (item.price * item.quantity).toFixed(2) : '0.00'}
                      </p>
                      <button
                        onClick={() => {
                          console.log('Cart item being removed:', item);
                          console.log('Product ID being passed:', item._id);
                          removeFromCart(item._id);
                        }}
                        className="mt-2 text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Address, Payment, Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Address Selection (latest 3) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Delivery Address</h3>
                <button className="text-blue-600 text-sm hover:underline" onClick={() => navigate('/addresses')}>Manage</button>
              </div>
              {addressesLoading ? (
                <p className="text-gray-600 text-sm">Loading addresses…</p>
              ) : addresses.length === 0 ? (
                <div className="text-sm text-gray-700">
                  <p className="mb-2">You have no saved addresses.</p>
                  <button
                    onClick={() => navigate('/addresses')}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map(addr => (
                    <label key={addr._id} className="flex items-start space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="address"
                        className="mt-1"
                        checked={selectedAddressId === addr._id}
                        onChange={() => setSelectedAddressId(addr._id)}
                      />
                      <div>
                        <p className="font-medium">{`${addr.firstName || ''} ${addr.lastName || ''}`.trim() || '—'}</p>
                        <p className="text-gray-600 text-sm">{addr.street || addr.address || ''}</p>
                        <p className="text-gray-600 text-sm">{[addr.city, addr.state, addr.zip].filter(Boolean).join(', ')}</p>
                        {addr.number ? <p className="text-gray-600 text-sm">{addr.number}</p> : null}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Method (credit or debit card only) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="space-y-3 text-sm">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={() => setPaymentMethod('credit_card')}
                  />
                  <span>Credit Card</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value="debit_card"
                    checked={paymentMethod === 'debit_card'}
                    onChange={() => setPaymentMethod('debit_card')}
                  />
                  <span>Debit Card</span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading || !selectedAddressId}
                  className="w-full py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? 'Creating Order...' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;