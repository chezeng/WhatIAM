import AOS from 'aos';
import 'aos/dist/aos.css';
import Title from './Title';
import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    AOS.init({
        duration: 500,
        once: false, 
    });
  }, []);

    return (
      <section className='p-28 w-screen h-full'>
        <Title title="About Me"></Title>
        <div data-aos="fade-up" data-aos-delay="50" className="lg:flex mt-14 flex md:flex-row flex-col items-center justify-around">
          <p className="text-xl md:text-3xl lg:w-1/3 md:ml-10 text-center md:text-left xl:-mt-20">
            I am a <span className="text-blue-500 font-bold">Computer Science</span> student at the University of Waterloo, 
            continuously learning <span className="text-blue-500 font-bold">new software technologies</span>.
            My dream is to fully utilize <span className="text-blue-500 font-bold">AI + software applications</span> to create impact.
          </p>
          <img className="profileImg floating rounded-3xl w-70 h-70 lg:w-2/5 lg:h-2/5 mt-12 xl:mt-24" src="/src/assets/Profile.jpg"></img>
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