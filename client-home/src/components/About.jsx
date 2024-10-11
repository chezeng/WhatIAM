import { useEffect } from 'react';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Title from './Title';
import profileImage from '/src/assets/Profile.jpg';

const About = () => {
  useEffect(() => {
    AOS.init({
        duration: 500,
        once: false, 
    });
  }, []);

    return (
      <section id='about' className='p-28 w-screen h-full'>
        <Title title="About Me"></Title>
        <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col md:flex-row mt-14 lg:px-20 xl:px-28 items-center">
          <div className='space-y-10 mt-0 md:mt-10'>
            <p className="text-center md:text-left text-xl md:text-3xl">
              I am a <span className="gradient bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold">Computer Science</span> student at the University of Waterloo, 
              continuously learning <span className="gradient bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold">new software technologies</span>.
              My dream is to fully utilize <span className="gradient bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold">AI + software applications</span> to create impact.
            </p>

            <div className="flex justify-center md:justify-start space-x-8"> 
                <a href="https://www.linkedin.com/in/cz5/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="tech-icons"/>
                </a>
                <a href="https://github.com/ch3ngz" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="tech-icons"/>
                </a>
                <a href="https://www.youtube.com/@c3z05" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="tech-icons"/>
                </a>
            </div>

            <div className="flex justify-center md:justify-start">
              <div className='card-wrapper-button font-bold h-[5rem] w-[15rem] hover:scale-105 transition ease-in-out'>
                <a href='https://plx7p8bqu2ak2ffc.public.blob.vercel-storage.com/ChengResume-yLCbQHJSQGNGaqGS4iPKgC71r3ThN5.pdf' target="_blank" rel="noopener noreferrer">
                  <div className='card-content-button rounded-3xl cursor-pointer'>
                    <p className="text-center text-xl font-bold mt-6">Check my resume</p>
                  </div>
                </a> 
              </div>
            </div>
          </div>

          <div className='hover:scale-105 transition ease-in-out duration-300'>
            <img className="floating rounded-3xl w-50 h-50 md:w-4/5 md:h-4/5 mt-10 ml-0 md:ml-20 lg:ml-40" src={profileImage}></img>
          </div>

        </div>  
      </section>
    );
}



export default About;