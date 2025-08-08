import React, { useState, useEffect } from 'react';
import { getAddresses, addAddress, deleteAddress, updateAddress } from '../services/api';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import EditAddressModal from '../model/EditAddressModal';

const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        country: '',
        state: '',
        zip: '',
        number: ''
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const res = await getAddresses();
            if (res?.data?.addresses) {
                setAddresses(res.data.addresses);
            } else {
                setAddresses([]);
            }
        } catch (error) {
            toast.error('Failed to load addresses');
            setAddresses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Saving...');
        try {
            await addAddress(formData);
            toast.update(toastId, { render: 'Address added', type: 'success', isLoading: false, autoClose: 3000 });
            setFormData({
                firstName: '',
                lastName: '',
                street: '',
                country: '',
                state: '',
                zip: '',
                number: ''
            });
            fetchAddresses();
        } catch (err) {
            toast.update(toastId, { render: 'Failed to add address', type: 'error', isLoading: false });
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAddress(id);
            toast.success('Address deleted');
            fetchAddresses();
        } catch {
            toast.error('Failed to delete address');
        }
    };


    const handleUpdate = (id) => {
        setEditingAddressId(id);
    };





    if (loading) {
        return (
            <div className="max-w-4xl mx-auto mt-16">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-300 w-1/3 rounded"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded col-span-2"></div>
                    </div>
                </div>
            </div>
        );
    }



    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">📍 My Addresses</h2>


            {editingAddressId && (
                <EditAddressModal
                    addressId={editingAddressId}
                    onClose={() => setEditingAddressId(null)}
                    onSuccess={fetchAddresses}
                />
            )}

            {/* Saved Addresses */}
            {addresses.map((addr) => (
                <label
                    key={addr._id}
                    className={`flex items-start justify-between p-4 border rounded-lg bg-white cursor-pointer transition hover:shadow ${selectedAddress === addr._id ? 'border-green-500' : 'border-gray-300'
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <input
                            type="radio"
                            name="savedAddress"
                            checked={selectedAddress === addr._id}
                            onChange={() => setSelectedAddress(addr._id)}
                            className="mt-1 accent-green-600"
                        />
                        <div>
                            <p className="font-semibold">
                                {addr.firstName} {addr.lastName}
                            </p>
                            <p className="text-sm text-gray-600">
                                {addr.street}
                            </p>
                            <p className="text-sm text-gray-600">
                                {addr.state}, {addr.zip}
                            </p>
                            <p className="text-sm text-gray-600">
                                {addr.country}
                            </p>
                            <p className="text-sm text-gray-600">
                                Phone: {addr.number}
                            </p>
                        </div>
                    </div>
                    <div className="text-sm text-blue-600 flex gap-4">
                        <button type="button" onClick={() => handleUpdate(addr._id, addr)} className="hover:underline">
                            Edit
                        </button>
                        <button type="button" onClick={() => handleDelete(addr._id)} className="hover:underline text-red-500">
                            Delete
                        </button>
                    </div>
                </label>
            ))}


            {/* Add New Address */}
            <form
                onSubmit={handleSubmit}
                className="p-6 border border-green-500 rounded-lg bg-white space-y-6"
            >
                <div className="flex items-center gap-2">
                    <input type="radio" checked readOnly className="accent-green-600" />
                    <h3 className="text-lg font-medium text-gray-800">Add New Address</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
                    <Input name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
                    <Input name="street" label="Street Address" value={formData.street} onChange={handleChange} />
                    <Input
                        name="number"
                        label="Phone Number"
                        value={formData.number}
                        onChange={(e) => setFormData({ ...formData, number: Number(e.target.value) })}
                    />
                    <Input name="country" label="Country" value={formData.country} onChange={handleChange} />

                    <Input name="state" label="State" value={formData.state} onChange={handleChange} />
                    <Input name="zip" label="ZIP Code" value={formData.zip} onChange={handleChange} />
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" className="text-gray-500 hover:underline">Cancel</button>
                    <button
                        type="submit"
                        className="bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Use This Address
                    </button>
                </div>
            </form>
        </div>
    );
};

const Input = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
    </div>
);

export default AddressPage;
