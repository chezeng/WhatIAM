import React, { useState, useEffect } from 'react';
import { FaHandshake, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import Title from './Title';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  useEffect(() => {
    AOS.init({
        duration: 500,
        once: false, 
    });
}, []);

const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});
const [errors, setErrors] = useState({});
const [successMessage, setSuccessMessage] = useState('');

const validateForm = () => {
  let newErrors = {};
  if (!formData.name.trim() || !/^[a-zA-Z\s]+$/.test(formData.name)) {
    newErrors.name = 'Please provide a name without numbers or special characters.';
  }
  if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please provide a valid email address.'; 
  }
  if (formData.message.trim().length < 30) {
    newErrors.message = 'Please provide a message with at least 30 characters.';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
  // Clear error for this field as user types
  setErrors(prev => ({ ...prev, [name]: '' }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await fetch('https://server.chengzeng.dev/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSuccessMessage(data.message || 'Message received! I\'ll be in touch as soon as possible.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Oops! Something went wrong. Please try again later.' });
    }
  }
};

  return (
    <section id='contact' className='py-28 px-10 md:px-28 w-full relative'>
      <Title title='Contact'/>
      <h2 data-aos="fade-up" data-aos-delay="50" className="text-center mt-20 text-lg md:text-4xl">
        Feel free to contact me and I will respond <span className='gradient bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold inline font-bold'>as soon as possible</span>. <br></br>
      </h2>   
      
      <div data-aos="fade-up" data-aos-delay="50" className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg mt-10 w-full">
        <h1 className="text-3xl font-bold paragraph text-white mb-8">Let's Craft Something Extraordinary!</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="How may I address you?"
              className={`w-full px-4 py-2 rounded-md bg-gray-800 bg-opacity-50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500 flex items-center"><FaExclamationCircle size={16} className="mr-1" /> {errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="How would you like me to contact you?"
              className={`w-full px-4 py-2 rounded-md bg-gray-800 bg-opacity-50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center"><FaExclamationCircle size={16} className="mr-1" /> {errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="I would love to hear your ideas; please feel free to share!"
              className={`w-full px-4 py-2 rounded-md bg-gray-800 bg-opacity-50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-500 flex items-center"><FaExclamationCircle size={16} className="mr-1" /> {errors.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 transform hover:scale-105"
          >
            SEND IT OFF!
          </button>
        </form>
        {successMessage && (
          <div className="mt-4 p-3 bg-green-600 text-white rounded-md flex items-center">
            <FaCheckCircle size={20} className="mr-2" />
            {successMessage}
          </div>
        )}
      </div>

      <div className='absolute bottom-1/3 md:bottom-1/2 left-0 w-full flex justify-center opacity-10 pointer-events-none'>
        <FaHandshake className="w-40 h-40 md:w-120 md:h-120" />
      </div>
    </section>
    );
}

export default Contact;