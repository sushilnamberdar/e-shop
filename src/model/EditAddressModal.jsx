import React, { useEffect, useState } from 'react';
import { getAddresses, updateAddress } from '../services/api';
import { toast } from 'react-toastify';

const EditAddressModal = ({ addressId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch address by ID
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await getAddresses(); // Assuming it returns all
        const address = res?.data?.addresses?.find((a) => a._id === addressId);
        if (address) {
          setFormData(address);
        } else {
          toast.error('Address not found');
          onClose();
        }
      } catch (err) {
        toast.error('Failed to load address');
        onClose();
      } finally {
        setLoading(false);
      }
    };

    if (addressId) fetchAddress();
  }, [addressId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      addressId,
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      street: formData.street || '',
      state: formData.state || '',
      zip: formData.zip || '',
      country: formData.country || '',
      number: formData.number || ''
    };

    try {
      await updateAddress(payload);
      toast.success('Address updated');
      onSuccess();  // Tell parent to refresh
      onClose();    // Close modal
    } catch {
      toast.error('Failed to update address');
    }
  };

  if (loading || !formData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <p>Loading address...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Edit Address</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-1/2 p-2 border rounded" placeholder="First Name" />
            <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-1/2 p-2 border rounded" placeholder="Last Name" />
          </div>
          <input name="street" value={formData.street} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Street" />
          <div className="flex gap-2">
            <input name="state" value={formData.state} onChange={handleChange} className="w-1/2 p-2 border rounded" placeholder="State" />
            <input name="zip" value={formData.zip} onChange={handleChange} className="w-1/2 p-2 border rounded" placeholder="ZIP Code" />
          </div>
          <div className="flex gap-2">
            <input name="country" value={formData.country} onChange={handleChange} className="w-1/2 p-2 border rounded" placeholder="Country" />
            <input  name="number" value={formData.number} onChange={handleChange} className="w-1/2 p-2 border rounded" placeholder="Phone Number" />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressModal;
