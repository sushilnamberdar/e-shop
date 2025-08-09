import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaEnvelope, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { sendVerificationEmail, verifyEmail } from '../services/api';
import imagedatamail from '../assets/Email.json'
import { Player } from '@lottiefiles/react-lottie-player';

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
          console.error('Email verification failed:', err);
          // setError(err.message)
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
    <div className="h-screen  w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
     

    
      <div className=" z-10 flex  mt-5 items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
          <div className="text-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-lg overflow-hidden">
            {isVerified ? (
              <FaCheckCircle className="mx-auto h-14 w-14 text-green-400 drop-shadow" />
            ) : (
              <FaEnvelope className="mx-auto h-14 w-14 text-blue-400 drop-shadow" />
            )}
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-black/50">
              {isVerified ? 'Email Verified' : 'Verify Your Email'}
            </h2>
            <p className="mt-2 text-sm text-black/50">
              {isVerified
                ? 'You can now access all features. Welcome !'
                : 'We have sent a verification link to your email. Click it to continue.'}
            </p>
          </div>

          {/* Micro-video depending on state */}
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
            <Player
              autoplay
              loop
              src={imagedatamail}
              style={{ height: '300px', width: '300px' }}
            />
          </div>

          <div className="mt-6">
            {message && (
              <div className="mb-4 rounded-md border border-emerald-400/30 bg-emerald-400/10 p-3 text-black/70">
                {message}
              </div>
            )}
            {error && (
              <div className="mb-4 rounded-md border border-rose-700 bg-rose-400/10 p-3 text-black/50">
                {error}
              </div>
            )}

            {!token && !isVerified && (
              <button
                onClick={handleSendVerification}
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600/90 px-4 py-3 font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-white" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Resend Verification Email</span>
                  </>
                )}
              </button>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/profile')}
                className="text-sm font-medium text-black/80 underline-offset-2 underline decoration-blue-400   transition hover:text-blue-400 hover:underline"
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