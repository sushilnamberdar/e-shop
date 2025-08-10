import axios from "axios";
// Email Verification APIs
// const apiurl = 'http://localhost:5080/api'
const apiurl = 'https://e-shop-backend-eosin.vercel.app/api'



export const sendVerificationEmail = async () => {
  try {
    const response = await axios.post(`${apiurl}/email-verification/send-verification/me`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${apiurl}/email-verification/verify/${token}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Order APIs
export const getUserOrders = async () => {
  try {
    const response = await axios.get(`${apiurl}/orders/my-orders`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${apiurl}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${apiurl}/orders`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.patch(`${apiurl}/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.post(`${apiurl}/orders/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 

