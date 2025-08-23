import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import registerimage from "../assets/register.json"


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg">
        
        {/* Left side animation */}
         <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden lg:flex lg:w-1/2 items-center justify-center bg-blue-100"
        >
          <Lottie
            animationData={registerimage}
            loop={true}
            className="w-[80%] h-[80%]"
          />
        </motion.div>

        {/* Right side form */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md w-full mx-auto"
          >
            {/* Logo / Brand */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl font-bold text-blue-600">🔒</span>
              </div>
            </div>

            <h2 className="text-center text-3xl font-extrabold text-black/50 drop-shadow-md">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-black/50">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-yellow-300 hover:text-yellow-200"
              >
                Sign up
              </Link>
            </p>

            {/* Glassmorphism Form */}
            <div className="mt-8 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full px-4 py-2 border border-transparent rounded-lg shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-4 py-2 border border-transparent rounded-lg shadow-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
                    />
                  </div>
                </div>

                {/* Forgot password */}
                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-yellow-300 hover:text-yellow-200"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Button */}
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 rounded-lg shadow-md text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-yellow-300 disabled:opacity-50"
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
  );
};

export default LoginPage;
