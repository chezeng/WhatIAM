import React, { useEffect } from 'react';
import { FaHandshake } from "react-icons/fa";
import Title from './Title';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {
  useEffect(() => {
    AOS.init({
        duration: 500,
        once: false, 
    });
}, []);

    return (
    <section id='contact' className='p-28 w-screen h-max'>
      <Title title='Contact'/>
      <div className='flex justify-center opacity-15'><FaHandshake className="w-120 h-120"/></div>     
      <h2 data-aos="fade-up" data-aos-delay="50" className="text-center -mt-85 text-4xl">
        I'm always seeking for the <span className='text-blue-500 inline font-bold'>unity of knowledge and action</span>. <br></br>
        Feel free to contact me and I will respond as soon as possible.
      </h2>   
      
      <div data-aos="zoom-in" data-aos-delay="50" className="flex justify-center mt-24">
        <div className='card-wrapper-button font-bold h-[5rem] w-[15rem] hover:scale-105 transition ease-in-out -mt-10'>
          <a href="mailto:virtualstar0125@gmail.com" target="_blank" rel="noopener noreferrer">
            <div className='card-content-button rounded-3xl cursor-pointer'>
              <p className="text-center text-2xl font-bold mt-5">Contact Me</p>
            </div>
          </a> 
        </div>
      </div>      

    </section>
    );
}



export default Contact;
