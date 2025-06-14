import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserOrders, getOrderById, updateOrderStatus, cancelOrder } from '../api';
import { FaSpinner, FaEye, FaTimes } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getUserOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = async (orderId) => {
    try {
      const order = await getOrderById(orderId);
      setSelectedOrder(order);
    } catch (err) {
      setError(err.message || 'Failed to fetch order details');
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      // Refresh orders after update
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        const updatedOrder = await getOrderById(orderId);
        setSelectedOrder(updatedOrder);
      }
    } catch (err) {
      setError(err.message || 'Failed to update order status');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);
      // Refresh orders after cancellation
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                  <p className="text-gray-600">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-600">
                    Total: ${order.total.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewOrder(order.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <FaEye className="inline-block mr-2" />
                    View Details
                  </button>
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      <FaTimes className="inline-block mr-2" />
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {selectedOrder?.id === order.id && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-semibold mb-2">Order Items:</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {order.status === 'pending' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Update Status
                      </label>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) =>
                          handleUpdateStatus(order.id, e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  )}
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