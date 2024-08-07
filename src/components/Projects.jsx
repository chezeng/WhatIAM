import React, { useEffect } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaJava, FaAndroid, FaWix, FaImages } from 'react-icons/fa';
import { SiTailwindcss, SiCreatereactapp, SiJetbrains, SiGodotengine, SiCanva, SiAdobeaftereffects} from "react-icons/si";
import { ReactSVG } from 'react-svg';
import Title from './Title';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Projects = () => {
  const IconWithTooltip = ({ icon: Icon, label }) => {
    return (
      <div className="relative group flex items-center mx-1">
        <Icon className="text-3xl mb-3 group-hover:text-blue-500 transition-colors" />
        <span className="absolute left-1/2 transform -translate-x-1/2 mt-8 w-max text-white text-xs font-medium p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
      </div>
    );
  };

  useEffect(() => {
    AOS.init({
        duration: 1000,
        once: false, 
    });
}, []);

  return (
    <section id='projects' data-aos="fade-up" data-aos-delay="50" className='sm:p-28 w-screen'>
      <Title title="Projects"/>
      <div className='grid sm:grid-cols-1 lg:grid-cols-2 items-center justify-items-center mt-16'>
        <div  className='card-wrapper h-[30rem] w-[24rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src="/src/assets/Music.png" alt="WhatIAM" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">WhatIAM</div>
                <p className="text-slate-500 text-base mt-2">
                Developed a dynamic portfolio website using React, integrating advanced libraries
                and tools to enhance visual effects and improve user experience (UX).
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/WhatIAM" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="flex ml-2 mt-1.5">
                    <IconWithTooltip icon={FaHtml5} label="HTML" />
                    <IconWithTooltip icon={FaCss3Alt} label="CSS" />
                    <IconWithTooltip icon={FaJs} label="JavaScript" />
                    <IconWithTooltip icon={FaReact} label="React" />
                    <IconWithTooltip icon={FaNodeJs} label="NodeJs" />
                    <IconWithTooltip icon={SiTailwindcss} label="TailwindCSS" />
                  </div>
              </div>
          </div>
        </div>

        <div className='card-wrapper h-[30rem] w-[24rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src="/src/assets/Music.png" alt="The Mathetia" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">The Mathetia</div>
                <p className="text-slate-500 text-base mt-2">
                Used GDscript and AI technologies to create a solo game demo as my capstone project within ONE year.
                The project encouraged me to explore AI's potential and its ethical use.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/The-Mathetia" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="flex ml-2 mt-1.5">
                    <IconWithTooltip icon={SiGodotengine} label="GdScript" />
                    <IconWithTooltip icon={FaImages} label="Stable Diffusion" />
                    <div className="relative group flex items-center mx-1">
                      <ReactSVG src="/src/assets/ChatGPT.svg" className="text-3xl mb-3 group-hover:text-blue-500 transition-colors" />
                      <span className="absolute left-1/2 transform -translate-x-1/2 mt-8 w-max text-white text-xs font-medium p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ChatGPT
                      </span>
                    </div>
                    <IconWithTooltip icon={SiCanva} label="Figma" />
                    <IconWithTooltip icon={SiAdobeaftereffects} label="Adobe After Effects" />
                    <IconWithTooltip icon={FaWix} label="Wix" />
                  </div>
              </div>
          </div>
        </div>

        <div className='card-wrapper h-[30rem] w-[24rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src="/src/assets/Music.png" alt="Recyclable" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">Recyclable</div>
                <p className="text-slate-500 text-base mt-2">
                Gained experience in 8-month Android app development using Java and Figma. 
                This collaboration enhanced understanding of professional software development.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/Recyclable" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="flex ml-2 mt-1.5">
                    <IconWithTooltip icon={FaJava} label="Java" />
                    <div className="relative group flex items-center mx-1">
                      <ReactSVG src="/src/assets/ChatGPT.svg" className="text-3xl mb-3 group-hover:text-blue-500 transition-colors" />
                      <span className="absolute left-1/2 transform -translate-x-1/2 mt-8 w-max text-white text-xs font-medium p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ChatGPT
                      </span>
                    </div>
                    <IconWithTooltip icon={SiCanva} label="Figma" />
                    <IconWithTooltip icon={FaAndroid} label="Android" />
                  </div>
              </div>
          </div>
        </div>

        <div className='card-wrapper h-[30rem] w-[24rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src="/src/assets/Music.png" alt="X-Toolkit" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">X-Toolkit</div>
                <p className="text-slate-500 text-base mt-2">
                Created an expense tracking system using DOM manipulation and event listeners,
                with component-based architecture and props to manage data flow.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/X-Toolkit" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="flex ml-2 mt-1.5">
                    <IconWithTooltip icon={FaReact} label="React" />
                    <IconWithTooltip icon={FaNodeJs} label="NodeJs" />
                    <IconWithTooltip icon={SiCreatereactapp} label="Create React App" />
                  </div>
              </div>
          </div>
        </div>

        <div className='card-wrapper h-[30rem] w-[24rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src="/src/assets/Music.png" alt="Android-Pack" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">Android-Pack</div>
                <p className="text-slate-500 text-base mt-2">
                Implemented object-oriented programming principles and design patterns in a question bank application to
                enhance code maintainability.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/Android-Pack" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="flex ml-2 mt-1.5">
                    <IconWithTooltip icon={FaJava} label="Java" />
                    <IconWithTooltip icon={SiJetbrains} label="JetBrains"/>
                    <IconWithTooltip icon={FaAndroid} label="Android" />

                  </div>
              </div>
          </div>
        </div>

        <div className='card-wrapper-strange h-[30rem] w-[24rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src="/src/assets/Music.png" alt="?" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">?</div>
                <p className="text-slate-500 text-base">
                To be continued...
                </p>
              </div>
              <div className="px-6 pt-4 pb-2 mt-18">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer"><button className='bg-blue-500 text-white hover:bg-red-700 hover:transition hover:ease-in-out font-normal py-2 px-4 rounded mb-4 transition ease-in-out'>
                  Don't Click Me
                </button></a>
              </div>
          </div>
        </div>
      </div>

    </section>
    );
}



export default Projects;

