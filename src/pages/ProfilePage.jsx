  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';
  import { getUser, updateProfile } from '../services/api';
  import { toast } from 'react-toastify';
  import { Player } from '@lottiefiles/react-lottie-player';
  import verifiedimagedata from '../assets/Verify.json';
  import { FaUserCircle, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

  const ProfilePage = () => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: ''
    });

    useEffect(() => {
      fetchUserData();
    }, []);

    const fetchUserData = async () => {
      try {
        const response = await getUser();
        console.log('response in profile page ', response);
        setUser(response);
        setFormData({
          name: response.name,
          email: response.email
        });
      } catch (error) {
        toast.error('Failed to fetch user data');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await updateProfile(formData);
        setUser(response.data);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to update profile');
      }
    };

    const emailVerified = Boolean(
      user && (user.isVerified || user.emailVerified || user.isEmailVerified || user.verified)
    );

    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12">
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8">
          <div className="flex items-center gap-4 mb-6">
            <FaUserCircle className="h-14 w-14 text-blue-600" />
            <div className="min-w-0">
              <div className="text-xl font-semibold truncate">{user?.name || 'User'}</div>
              <div className="text-gray-500 text-sm truncate">{user?.email || ''}</div>
            </div>
            <div className="ml-auto">
              {emailVerified ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-sm">
                  <FaCheckCircle /> Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 text-rose-700 px-3 py-1 text-sm">
                  <FaTimesCircle /> Not verified
                </span>
              )}
            </div>
          </div>

          <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-4">
              {emailVerified ? (
                <Player autoplay loop src={verifiedimagedata} style={{ height: 80, width: 80 }} />
              ) : (
                <FaTimesCircle className="h-10 w-10 text-rose-500" />
              )}
              <div className="flex-1">
                <div className="font-semibold">Email verification</div>
                <div className="text-sm text-gray-600">
                  {emailVerified
                    ? 'Your email is verified.'
                    : 'Your email is not verified. Verify to secure your account and unlock features.'}
                </div>
                {!emailVerified && (
                  <Link to="/verify-email" className="inline-block mt-2 font-medium text-blue-600 hover:underline">
                    Send verification email
                  </Link>
                )}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">My Profile</h2>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.name,
                      email: user.email
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={user?.name || ''}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-1">Joined</label>
                <input
                  type="text"
                  value={new Date(user?.createdAt).toLocaleDateString() || ''}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  export default ProfilePage;
