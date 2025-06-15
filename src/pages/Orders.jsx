import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { FaSpinner, FaEye, FaTimes, FaBox } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Orders component mounted');
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...');
      setLoading(true);
      setError('');
      
      console.log('Calling orderAPI.getUserOrders()');
      const data = await orderAPI.getUserOrders();
      console.log('Received orders data:', data);
      
      setOrders(data);
    } catch (err) {
      console.error('Error in fetchOrders:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response,
        stack: err.stack
      });
      setError(err.message || 'Failed to fetch orders');
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order-confirmation/${orderId}`);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      console.log('Cancelling order:', orderId);
      await orderAPI.cancelOrder(orderId);
      console.log('Order cancelled successfully');
      toast.success('Order cancelled successfully');
      fetchOrders(); // Refresh orders list
      if (selectedOrder?._id === orderId) {
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      toast.error(err.message || 'Failed to cancel order');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <FaBox className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order._id}</h2>
                  <p className="text-gray-600">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Status: <span className="capitalize">{order.status}</span></p>
                  <p className="text-gray-600">
                    Total: ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewOrder(order._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <FaEye className="inline-block mr-2" />
                    View Details
                  </button>
                 
                </div>
              </div>

              {selectedOrder?._id === order._id && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold mb-2">Order Items:</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Shipping Address:</h3>
                    <div className="text-gray-600">
                      <p>{selectedOrder.shippingAddress.name}</p>
                      <p>{selectedOrder.shippingAddress.address}</p>
                      <p>
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                      </p>
                      <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 