import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAddresses } from '../services/api';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getAddresses();
      console.log('address', response)
      setAddresses(response.data.addresses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to load addresses');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
    const selected = addresses.find(addr => addr._id === addressId);
    if (selected) {
      setFormData({
        address: selected.address,
        city: selected.city,
        postalCode: selected.postalCode,
        country: selected.country
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically send the order to your backend
      // For now, we'll just show a success message and clear the cart
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4">Loading addresses...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="mb-4">Please add some items to your cart before checking out.</p>
        <button 
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No Address Found</h2>
        <p className="mb-4">Please add a shipping address before proceeding with checkout.</p>
        <button 
          onClick={() => navigate('/addresses')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Manage Addresses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Select Shipping Address</h3>
          <button
            onClick={() => navigate('/addresses')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Manage Addresses
          </button>
        </div>
        
        {/* Saved Addresses */}
        <div className="mb-6">
          <div className="space-y-3">
            {addresses.map((address) => (
              <label
                key={address._id}
                className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAddress === address._id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-400'
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  value={address._id}
                  checked={selectedAddress === address._id}
                  onChange={() => handleAddressSelect(address._id)}
                  className="mt-1"
                />
                <div className="ml-3">
                  <p className="font-medium">{address.address}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.postalCode}
                  </p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <ul className="divide-y divide-gray-200 mb-4">
            {cartItems.map(item => (
              <li key={item._id} className="flex justify-between py-2">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={!selectedAddress}
            className={`w-full py-2 rounded font-semibold transition ${
              selectedAddress 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
