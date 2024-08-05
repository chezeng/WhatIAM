import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const titleRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    AOS.init({
        duration: 500,
        once: false, 
    });

    const handleScroll = () => {
        const titleElement = titleRef.current;
        const leftLineElement = leftLineRef.current;
        const rightLineElement = rightLineRef.current;
        const dotElement = dotRef.current;

        if (titleElement.getBoundingClientRect().top < window.innerHeight) {
            dotElement.classList.add('animate-dot');
            leftLineElement.classList.add('animate-line-left');
            rightLineElement.classList.add('animate-line-right');
            titleElement.classList.add('animate-title');
        } else {
            dotElement.classList.remove('animate-dot');
            leftLineElement.classList.remove('animate-line-left');
            rightLineElement.classList.remove('animate-line-right');
            titleElement.classList.remove('animate-title');
        }
      };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };

  }, []);

    return (
      <section className='p-28 w-screen h-full'>
        <div className="relative flex justify-center items-center mt-10">
          <div ref={dotRef} className="absolute bg-white rounded-full z-10 mt-4 md:mt-9" style={{ width: '10px', height: '10px' }}></div>
          <div ref={leftLineRef} className="absolute h-[2px] bg-white mr-5 mt-4 md:mt-9" style={{ width: '0', right: 'calc(50% + 5px)' }}></div>
          <div ref={rightLineRef} className="absolute h-[2px] bg-white ml-5 mt-4 md:mt-9" style={{ width: '0', left: 'calc(50% + 5px)' }}></div>
          <h1 ref={titleRef} className="absolute -top-18 text-5xl md:text-6xl font-bold opacity-0 transition-all duration-500">About Me</h1>
        </div>
        
        <div data-aos="fade-up" data-aos-delay="50" className="lg:flex mt-14 flex md:flex-row flex-col items-center justify-around">
          <p className="text-xl md:text-3xl lg:w-1/3 md:ml-10 text-center md:text-left xl:-mt-20">
            I am a <span className="text-blue-500 font-bold">Computer Science</span> student at the University of Waterloo, 
            continuously learning <span className="text-blue-500 font-bold">new software technologies</span>.
            My dream is to fully utilize <span className="text-blue-500 font-bold">AI + software applications</span> to create impact.
          </p>
          <img data-aos="zoom-in" data-aos-delay="50" className="floating rounded-3xl w-70 h-70 lg:w-2/5 lg:h-2/5 mt-12 xl:mt-24" src="/src/assets/Profile.jpg"></img>
        </div> 
     
        <div data-aos="fade-up" className="flex justify-center sm:w-full md:w-1/2 lg:w-2/5 xl:-ml-6 -mt-16 lg:-mt-24 xl:-mt-60">
          <div className='card-wrapper-button font-bold h-[5rem] w-[15rem] hover:scale-105 transition ease-in-out mt-28'>
            <a href={'/src/assets/ChengResume.pdf'} target="_blank" rel="noopener noreferrer">
              <div className='card-content-button rounded-3xl cursor-pointer'>
                <p className="text-center text-xl font-bold mt-6">Check my resume</p>
              </div>
            </a> 
          </div>
        </div>
        
      </section>
    );
}



export default About;