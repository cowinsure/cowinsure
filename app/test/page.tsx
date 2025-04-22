'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import cover from '../../public/sampleCow2.jpg';
import CowPurchaseModal from '@/components/Project/cowSellProject/CowPurchaseModal';

const TestPage = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const cow = {
    id: 'COW-Y3',
    breed: 'Freisian Cross',
    age: '30 Month',
    gender: 'Male',
    color: 'Black and White',
    currentWeight: '480 KG',
    height: '5 Feet',
    expectedWeight: '460 KG',
    price: 'BDT 256000',
    sku: '5002_1',
    inStock: true,
    deliveryDays: '50-51 days',
  };

  const [isModalOpen, setIsModalOpen] = useState(false)

  const tabs = ['Overview', 'Delivery Terms', 'Payment Terms', 'FAQs'];

  return (
    <div className="bg-[#F7F7F7] p-6 pt-20 lg:p-10 lg:pt-28">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-md shadow-md overflow-hidden lg:flex">
        {/* Image Gallery */}
        <div className="lg:w-1/2 p-4">
          <div className="rounded-md overflow-hidden mb-4">
            <Image
              src={cover}
              alt="cow-main"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex space-x-2">
            {[1, 2, 3].map(i => (
              <button key={i} className="flex-1 bg-green-100 text-green-900 py-2 rounded-md">
                Preview
              </button>
            ))}
          </div>
        </div>

        {/* Main Info */}
        <div className="lg:w-1/2 p-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-medium">
            {cow.breed} - <span className="text-green-800">{cow.expectedWeight}</span>
          </h2>
          <p className="text-4xl font-bold text-green-900 my-4">{cow.price}</p>
          <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
                    >
                        Buy Now
                    </button>
        </div>
        <CowPurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Purchase Box */}
        {/* <div className="lg:w-1/3 p-6">
          <p className="text-sm font-medium">
            <span>SKU: {cow.sku}</span>
            {cow.inStock ? <span className="text-green-600 ml-2">In-stock</span> : <span className="text-red-600 ml-2">Out of stock</span>}
          </p>
          <p className="text-sm mt-2">Delivery will be 2 days before The Eid-Ul-Adha</p>
          <div className="flex items-center space-x-3 mt-4">
            <button className="flex items-center text-red-500">
              <FaHeart /> <span className="ml-1">Add to Wishlist</span>
            </button>
            <div className="flex space-x-2 text-gray-600">
              <FaFacebookF />
              <FaFacebookMessenger />
              <FaWhatsapp />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <p><strong>Delivery:</strong> {cow.deliveryDays}</p>
            <p><strong>Location:</strong> <span className="text-blue-600 underline cursor-pointer">Select your delivery location</span></p>
          </div>
          <div className="mt-4">
            <p className="font-medium">Card Payment</p>
            <div className="flex space-x-2 mt-2">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>AMEX</span>
            </div>
          </div>
          <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-md">bKash</button>
        </div> */}
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto bg-white mt-10 rounded-md shadow-md">
      <div className="bg-gray-100 rounded-lg p-2">
          <div className="grid grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 font-medium rounded-md transition-colors ${
                  activeTab === tab ? "bg-green-600 text-white" : "bg-green-100 text-green-900 hover:bg-green-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm m-2">
          {activeTab === 'Overview' && (
            <div>
            {/* <ul className="space-y-4">
              <li><strong>Cow ID:</strong> {cow.id}</li>
              <li><strong>Cow Breed:</strong> {cow.breed}</li>
              <li><strong>Age:</strong> {cow.age}</li>
              <li><strong>Gender:</strong> {cow.gender}</li>
              <li><strong>Color:</strong> {cow.color}</li>
              <li><strong>Current Live Weight:</strong> {cow.currentWeight}</li>
              <li><strong>Height:</strong> {cow.height}</li>
            </ul> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            {[
              { label: "Cow ID", value: cow.id },
              { label: "Cow Breed", value: cow.breed },
              { label: "Age", value: cow.age },
              { label: "Gender", value: cow.gender },
              { label: "Color", value: cow.color },
              { label: "Current Live Weight", value: cow.currentWeight },
              { label: "Height", value: cow.height },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <li><strong>{item.label}</strong> {item.value}</li>
              </div>
            ))}
          </div>
          </div>
          )}
          {activeTab === 'Delivery Terms' && <p>Delivery terms content...</p>}
          {activeTab === 'Payment Terms' && <p>Payment terms content...</p>}
          {activeTab === 'FAQs' && <p>FAQs content...</p>}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
