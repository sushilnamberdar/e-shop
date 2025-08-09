import React from 'react';
import { FaHeadset, FaEnvelope, FaPhoneAlt, FaComments } from 'react-icons/fa';

const SupportPage = () => {
  const supportEmail = 'support@e-shop.com';
  const supportPhone = '+1 (555) 123-4567';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-600/10 text-blue-600 mb-4">
            <FaHeadset className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">We're Here to Help</h1>
          <p className="mt-2 text-gray-600">Connect with our support team and we'll get back to you as soon as possible.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 grid place-items-center">
                <FaEnvelope />
              </div>
              <div className="font-semibold">Email</div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Send us an email and we'll reply within 24 hours.</p>
            <a href={`mailto:${supportEmail}`} className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">Email Support</a>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 grid place-items-center">
                <FaPhoneAlt />
              </div>
              <div className="font-semibold">Phone</div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Prefer to talk? Call our support line during business hours.</p>
            <a href={`tel:${supportPhone}`} className="inline-block rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700">Call {supportPhone}</a>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 grid place-items-center">
                <FaComments />
              </div>
              <div className="font-semibold">Live Chat</div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Chat with us for quick questions and guidance.</p>
            <button className="inline-block rounded-lg bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700">Start Chat</button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Jane Doe" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="jane@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows="4" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="How can we help?" />
            </div>
            <div className="md:col-span-2">
              <button type="button" className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;


