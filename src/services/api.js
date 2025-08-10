import axios from "axios";
// const API_URL = 'http://localhost:5080/api';
const API_URL = 'https://e-shop-backend-eosin.vercel.app/api'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Auth APIs
export const authAPI = {
  register: async (userData) => {
    try {
      console.log('Sending registration request with data:', userData);
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response || error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      console.log('Sending login request with data:', credentials);
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response || error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error.response || error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error.response || error);
      throw error;
    }
  },

  resetPassword: async (passwordData) => {
    try {
      console.log('Sending reset password request with data:', passwordData);
      const response = await api.post('/auth/reset-password', passwordData);
      console.log('Reset password response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error.response || error);
      throw error;
    }
  }
};

export const getUser = async () => {
  const res = await api.get('users/me');
  return res.data;
};

export const updateProfile = (data) => api.put('users/me', data);
export const changePassword = (data) => api.put('users/change-password', data);
export const getAddresses = async () => {
  try {
    const response = await api.get('users/addresses');
    console.log('Addresses API response:', response);
    return response;
  } catch (error) {
    console.error('Error in getAddresses:', error);
    throw error;
  }
};
export const addAddress = (data) => api.post('users/addresses', data);
export const deleteAddress = (addressId) => api.delete(`users/addresses/${addressId}`);

// Cart APIs
export const cartAPI = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Get cart error:', error.response || error);
      throw error;
    }
  },

  addToCart: async (product) => {
    try {
      // Make sure product._id exists and is a valid MongoDB ObjectId
      if (!product._id) {
        throw new Error('Product ID is missing');
      }

      const response = await api.post('/cart/add', {
        productId: product._id,  // This should be a valid MongoDB ObjectId
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1,
        category: product.category
      });
      return response.data;
    } catch (error) {
      console.error('Add to cart error:', error.response || error);
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(`/cart/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Remove from cart error:', error.response || error);
      throw error;
    }
  },

  updateCartQuantity: async (productId, quantity) => {
    try {
      const response = await api.put(`/cart/${productId}/quantity`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Update quantity error:', error.response || error);
      throw error;
    }
  },

  clearCart: async (userId) => {
    try {

      const response = await api.delete(`/cart/clear`, { userId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Product APIs
export const productAPI = {
  getProducts: async (category = null) => {
    try {
      const url = category ? `/products?category=${category}` : '/products?all=true';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProduct: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};

// Order APIs
export const orderAPI = {
  createOrder: async (orderData) => {
    try {
      console.log('Creating order with data:', orderData);
      const response = await api.post('/orders', orderData);
      console.log('Order created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error.response?.data || error.message;
    }
  },

  getUserOrders: async () => {
    try {
      console.log('Fetching user orders...');
      const response = await api.get('/orders/my-orders');
      console.log('User orders fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error.response?.data || error.message;
    }
  },

  getOrderById: async (orderId) => {
    try {
      console.log('Fetching order by ID:', orderId);
      const response = await api.get(`/orders/${orderId}`);
      console.log('Order details fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error.response?.data || error.message;
    }
  },

  getAllOrders: async () => {
    try {
      console.log('Fetching all orders...');
      const response = await api.get('/orders');
      console.log('All orders fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error.response?.data || error.message;
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      console.log('Updating order status:', { orderId, status });
      const response = await api.patch(`/orders/${orderId}/status`, { status });
      console.log('Order status updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error.response?.data || error.message;
    }
  },

  cancelOrder: async (orderId) => {
    try {
      console.log('Cancelling order:', orderId);
      const response = await api.put(`/orders/${orderId}/cancel`);
      console.log('Order cancelled successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error.response?.data || error.message;
    }
  }
};
export const featuredProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/featured`);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}



export const updateAddress = async (addressId, updatedData) => {
  console.log('updateAddress called with id:', addressId, 'and data:', updatedData);
    const payload = { ...updatedData, addressId};
  return api.put(`${API_URL}/users/addressupdate`, payload);
};

// Payment APIs
export const paymentAPI = {
  createPaymentIntent: async (orderId) => {
    try {
      console.log('Creating payment intent for order:', orderId);
      const response = await api.post('/payments/create-payment-intent', { orderId });
      console.log('Payment intent created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error.response?.data || error.message;
    }
  },

  confirmPaymentSuccess: async (orderId, paymentIntentId) => {
    try {
      console.log('Confirming payment success:', { orderId, paymentIntentId });
      const response = await api.post('/payments/payment-success', { 
        orderId, 
        paymentIntentId 
      });
      console.log('Payment success confirmed:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error confirming payment success:', error);
      throw error.response?.data || error.message;
    }
  }
};

export const sendVerificationEmail = async () => {
  try {
    const response = await api.post('/email-verification/send-verification/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`/email-verification/verify/${token}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}


export default api; 