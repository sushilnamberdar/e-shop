import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sendVerificationEmail, verifyEmail } from '../api';
import { FaEnvelope, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const EmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmailToken = async () => {
      if (token) {
        try {
          setLoading(true);
          setError('');
          setMessage('');
          
          await verifyEmail(token);
          setMessage('Email verified successfully! You can now access all features.');
          setIsVerified(true);
        } catch (err) {
          setError(err.message || 'Failed to verify email. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    verifyEmailToken();
  }, [token]);

  const handleSendVerification = async () => {
    try {
      setLoading(true);
      setError('');
      setMessage('');

      await sendVerificationEmail();
      setMessage('Verification email sent successfully! Please check your inbox.');
    } catch (err) {
      setError(err.message || 'Failed to send verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {isVerified ? (
              <FaCheckCircle className="mx-auto h-12 w-12 text-green-600" />
            ) : (
              <FaEnvelope className="mx-auto h-12 w-12 text-blue-600" />
            )}
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Email Verification
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isVerified 
                ? 'Your email has been verified successfully!'
                : 'Please verify your email address to access all features'}
            </p>
          </div>

          <div className="mt-8">
            {message && (
              <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
                {message}
              </div>
            )}
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {!token && !isVerified && (
              <button
                onClick={handleSendVerification}
                disabled={loading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Sending...
                  </>
                ) : (
                  'Send Verification Email'
                )}
              </button>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/profile')}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Back to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 