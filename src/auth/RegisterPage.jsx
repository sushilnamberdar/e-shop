import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import registerimage from '../assets/register.json'



const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    console.log('Form submitted with data:', formData);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      console.log('Sending registration data:', registerData);
      const response = await authAPI.register(registerData);
      console.log('Registration successful:', response);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row overflow-hidden shadow-2xl bg-white/10 backdrop-blur-lg">

      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        {/* Left Illustration */}
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


        {/* right section */}

        <div className="flex-1 flex flex-col justify-center py-10 px-6 sm:px-12 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md w-full mx-auto"
          >
            <div className='w-full flex items-center justify-center'>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl font-bold text-blue-600">🔒</span>
              </div>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="text-center text-3xl font-bold text-black/50">Create your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Already a member?{" "}
                <Link to="/login" className="font-semibold text-yellow-300 hover:text-yellow-200">
                  Sign in here
                </Link>
              </p>
            </div>



            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-6 shadow-lg border-t-0  rounded-2xl">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 
           border border-gray-300 
           border-t-0 border-l-0 border-r-0 
           rounded-lg shadow-sm 
           focus:ring-0 
           focus:border-b-2 focus:border-blue-500 
           focus:border-t-0 focus:border-l-0 focus:border-r-0"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 
           border border-gray-300 
           border-t-0 border-l-0 border-r-0 
           rounded-lg shadow-sm 
           focus:ring-0 
           focus:border-b-2 focus:border-blue-500 
           focus:border-t-0 focus:border-l-0 focus:border-r-0"

                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 
           border border-gray-300 
           border-t-0 border-l-0 border-r-0 
           rounded-lg shadow-sm 
           focus:ring-0 
           focus:border-b-2 focus:border-blue-500 
           focus:border-t-0 focus:border-l-0 focus:border-r-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-yellow-400 w-5 h-5" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 
           border border-gray-300 
           border-t-0 border-l-0 border-r-0 
           rounded-lg shadow-sm 
           focus:ring-0 
           focus:border-b-2 focus:border-blue-500 
           focus:border-t-0 focus:border-l-0 focus:border-r-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2 px-4 rounded-lg text-white font-medium shadow-md bg-yellow-400 hover:opacity-90 transition"
                    >
                      {loading ? "Creating..." : "Create Account "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>

      </div >
    </div>
  );
};

export default RegisterPage;
