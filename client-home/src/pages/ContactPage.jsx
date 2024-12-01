import { useState, useEffect } from 'react';
import { FaTimes, FaHandshake, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import Title from '../components/Title';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';

/**
 * ContactPage.jsx
 * 
 * Contact component renders a contact form with validation and submission functionality.
 * It includes fields for name, email, and message, and provides feedback on form submission.
 * The component also tracks cursor position for a visual effect and uses AOS for animations.
 *
 * @component
 * @example
 * return (
 *   <Contact />
 * )
 */

const Contact = () => {
  // Initialize AOS
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
const [errorMessage, setErrorMessage] = useState('');
// This array is used for the typewriter effect
const titles = ["Cutting-edge", "Unprecedented", "Reliable", "Well-documented", "Efficient", "Performant", "User-friendly", "Elegant", "Optimized" ]

// This state is used to track the cursor position for a visual effect
const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const x = e.pageX - e.currentTarget.offsetLeft;
  const y = e.pageY - e.currentTarget.offsetTop;
  setCursorPosition({ x, y });
};

// Validate form fields in case of empty, invalid input or spamming
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

// Handle input changes and update form data and errors
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
  setErrors(prev => ({ ...prev, [name]: '' }));
};

// Handle form submission and send POST request to the server 
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
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Reset form data and show success message
      setSuccessMessage('Message received! I\'ll be in touch as soon as possible.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      // Handle error and prevent spamming
      if (error.message.includes('Too many requests')) {
        setErrors({ submit: 'Messages are sent too quickly.' });
        setErrorMessage('You\'re sending messages too quickly. Please wait a minute before trying again.');
      } else {
        setErrors({ submit: 'Oops! Something went wrong. Please try again later.' });
      }
      console.error('Error submitting form:', error);
    }
  }
};

  return (
    <section id='contact' className='py-28 px-10 md:px-28 w-full relative'
      style={{
        '--x': `${cursorPosition.x}px`,
        '--y': `${cursorPosition.y}px`,
      }}
      onMouseMove={handleMouseMove}>
      {/* Title */}
      <Title title='Contact'/>

      <h2 data-aos="fade-up" data-aos-delay="50" className="text-center mt-10 md:mt-20 text-lg md:text-4xl">
        Feel free to contact me and I will respond <span className="gradient bg-gradient-to-b from-blue-300 to-blue-700 bg-clip-text text-transparent font-bold">as soon as possible</span>. <br></br>
      </h2>   
      
      {/* Contact Form */}
      <div data-aos="fade-up" data-aos-delay="50" className="bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg mt-10 w-full contact-form">
        
        {/* Visual effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-3xl"
          style={{
            background: `radial-gradient(circle at var(--x) var(--y), rgba(255, 255, 255, 0.3), transparent)`,
            opacity: 0.5,
            transition: '0.5s',
          }}></div>
        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold paragraph text-white mb-8">Let's Craft Something
        <span className="sm:inline-block ml-2">
          
          {/* Typewriter effect */}
          <Typewriter
            options={{
              strings: titles,
              autoStart: true,
              loop: true,
              deleteSpeed: 15,
              delay: 75,
              pauseFor: 2000,
            }}
          /></span></h1>

        {/* Form fields about name, email and message */}
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
          
          {/* Submit button v1 (Optional)*/}
          {/* <FancyButton color="cyan">SEND ME OFF!</FancyButton> */}

          {/* Submit button v2 */}
          <div className="flex justify-center md:justify-start">
              <div className='card-wrapper-button font-bold h-[4rem] w-[15rem] hover:scale-105 transition ease-in-out duration-500'>
                  <button className='card-content-button rounded-3xl cursor-pointer'>
                    <p className="text-center text-xl lg:text-2xl font-bold">Send me off!</p>
                  </button>  
                </div>
          </div>
          <p className='italic text-slate-400 text-center'>Passing by? Say hi <a className='underline text-white'href='https://blog.chengzeng.dev/Comments' target="_blank" rel="noopener noreferrer">here</a>!</p>

         
        </form>
        
        {/* Success and error messages */}
        {successMessage && (
          <div className="mt-4 p-3 bg-green-600 text-white rounded-md flex items-center">
            <FaCheckCircle size={20} className="mr-2" />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-600 text-white rounded-md flex items-center">
            <FaTimes size={20} className="mr-2" />
            {errorMessage}
          </div>
        )}
      </div>
      
      {/* An impressive handshake icon! */}
      <div className='absolute bottom-2/3 left-0 w-full flex justify-center opacity-20 pointer-events-none'>
        <FaHandshake className="w-40 h-40 md:w-80 md:h-80 lg:h-100" />
      </div>
    </section>
    );
}

export default Contact;
