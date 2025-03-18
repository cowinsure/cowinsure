'use client'
import React, { useState } from 'react';
import { GiBullHorns } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requestData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      description: formData.description
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact-us/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

    
      if (response.ok) {
        toast.success('Your message has been sent successfully.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          description: ''
        });
      } else {
        toast.error('Failed to send your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className=''>
        <GiBullHorns className='text-3xl text-white text-center w-full'/>
        <h2 className="text-2xl lg:text-5xl font-bold text-white">Contact Us</h2>
        <section className='h-auto mt-14 bg-[#F6F4EC] rounded-lg container mx-auto p-10'>
          <div className="px-4 py-8">
            <form onSubmit={handleSubmit} className="space-y-4 text-start">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-xl font-medium">First Name</label>
                  <input
                    type="text"
                    placeholder='Enter your first name'
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block h-[50px] lg:text-xl font-medium w-full p-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-white focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-xl font-medium">Last Name</label>
                  <input
                    type="text"
                    placeholder='Enter your last name'
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block h-[50px] lg:text-xl font-medium w-full p-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="email" className="block text-xl font-medium">Email</label>
                  <input
                    type="email"
                    placeholder='Enter your email'
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block h-[50px] lg:text-xl font-medium w-full p-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="phone" className="block text-xl font-medium">Phone</label>
                  <input
                    type="tel"
                    placeholder='Enter your phone number'
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block h-[50px] lg:text-xl font-medium w-full p-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-green-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-xl font-medium">Description</label>
                <textarea
                  id="description"
                  placeholder='Enter your message'
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block h-[20vh] lg:text-xl font-medium w-full p-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-green-500 sm:text-sm"
                  rows={4}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full justify-center py-3 px-5 border border-transparent shadow-sm text-2xl font-medium rounded-md text-white bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  );
};

export default ContactUs;
