import axios from 'axios';

const apiurl = 'http://localhost:5000/api';

// Cart APIs
export const clearCart = async (userId) => {
  try {
    const response = await axios.post(`${apiurl}/cart/clear`, { userId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 