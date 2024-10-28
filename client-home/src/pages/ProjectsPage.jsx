import { useEffect } from 'react';
import { FaFigma, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaJava, FaAndroid, FaWix, FaImages } from 'react-icons/fa';
import { SiExpress, SiKotlin, SiPostman, SiFlask, SiPython, SiVite, SiVercel, SiTailwindcss, SiCreatereactapp, SiGodotengine, SiCanva, SiAdobeaftereffects, SiMongodb, SiJavascript} from "react-icons/si";
import { ReactSVG } from 'react-svg';
import Title from '../components/Title';
import androidPack from '../assets/AndroidPack.png';
import recyclable from '../assets/Recyclable.png';
import theMathetia from '../assets/TheMathetia.png';
import timeless from '../assets/Timeless.png';
import whatIAM from '../assets/WhatIAM.png';
import xToolkit from '../assets/XToolkit.png';
import chatGPT from '../assets/ChatGPT.svg';

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
    <section id='projects' data-aos="fade-up" data-aos-delay="50" className='p-28'>
      <Title title="Projects"/>
      <div className='-ml-28 galaxy:-ml-24 iphone:-ml-21 s400:-ml-16 s450:-ml-8 s500:-ml-2 s550:ml-0 grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center'>
        <div className='card-wrapper h-[32rem] w-[20rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src={timeless} alt="Timeless" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">Timeless</div>
                <p className="text-slate-500 text-base mt-2">
                  An AI-powered app to provide immersive experiences by generating personalized audiovisuals with Cohere, Luma and Suno AI APIs.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/Timeless" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="grid grid-cols-4 ml-4 -mt-3">
                    <IconWithTooltip icon={FaReact} label="React" />
                    <IconWithTooltip icon={SiTailwindcss} label="TailwindCSS" />
                    <IconWithTooltip icon={SiPython} label="Python" />
                    <IconWithTooltip icon={SiFlask} label="Flask" />
                    <IconWithTooltip icon={SiPostman} label="Postman" />
                    <IconWithTooltip icon={SiMongodb} label="MongoDB" />
                    <IconWithTooltip icon={SiVite} label="Vite" />
                    <div className="relative group flex items-center mx-1">
                      <ReactSVG src={chatGPT} className="text-3xl mb-3 group-hover:text-blue-500 transition-colors" />
                      <span className="absolute left-1/2 transform -translate-x-1/2 mt-8 w-max text-white text-xs font-medium p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ChatGPT
                      </span>
                    </div>

                  </div>
              </div>
          </div>
        </div>
        
        <div className='card-wrapper h-[32rem] w-[20rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src={whatIAM} alt="WhatIAM" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">WhatIAM</div>
                <p className="text-slate-500 text-base mt-2">
                A dynamic personal portfolio and blog website using MERN stack with RESTful APIs, advanced libraries and user-friendly interface.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/WhatIAM" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="grid grid-cols-4 ml-4 -mt-3">
                    <IconWithTooltip icon={FaReact} label="React" />
                    <IconWithTooltip icon={SiTailwindcss} label="TailwindCSS" />
                    <IconWithTooltip icon={FaNodeJs} label="Node.js" />
                    <IconWithTooltip icon={SiExpress} label="Express.js" />
                    <IconWithTooltip icon={SiMongodb} label="MongoDB" />
                    <IconWithTooltip icon={SiVercel} label="Vercel" />
                    <IconWithTooltip icon={SiJavascript} label="JavaScript" />
                    <IconWithTooltip icon={SiVite} label="Vite" />
                  </div>
              </div>
          </div>
        </div>

        <div className='card-wrapper h-[32rem] w-[20rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src={theMathetia} alt="The Mathetia" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">The Mathetia</div>
                <p className="text-slate-500 text-base mt-2">
                A one-year solo RPG+ADV game project to discover AI's potential in worldbuilding and audio-visual enhancement, with
                detailed business plans and character designs.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/The-Mathetia" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="grid grid-cols-4 ml-4 mt-1">
                    <IconWithTooltip icon={SiGodotengine} label="GdScript" />
                    <IconWithTooltip icon={FaImages} label="Stable Diffusion" />
                    <IconWithTooltip icon={SiAdobeaftereffects} label="Adobe After Effects" />
                    <IconWithTooltip icon={FaWix} label="Wix" />
                  </div>
              </div>
          </div>
        </div>

        <div className='card-wrapper h-[32rem] w-[20rem] hover:scale-105 transition ease-in-out mt-20 '>
          <div className='card-content'>
              <div className="relative h-56">
                <img src={recyclable} alt="Recyclable" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">Recyclable</div>
                <p className="text-slate-500 text-base mt-2">
                An 8-month Android app development with solid teamwork and agile methodologies,
                providing profound insights of professional software development.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/Recyclable" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="grid grid-cols-4 ml-3 mt-1">
                    <IconWithTooltip icon={FaJava} label="Java" />
                    <IconWithTooltip icon={SiKotlin} label="Kotlin" />
                    <div className="relative group flex items-center mx-1">
                      <ReactSVG src={chatGPT} className="text-3xl mb-3 group-hover:text-blue-500 transition-colors" />
                      <span className="absolute left-1/2 transform -translate-x-1/2 mt-8 w-max text-white text-xs font-medium p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        ChatGPT
                      </span>
                    </div>
                    <IconWithTooltip icon={FaFigma} label="Figma" />
                  </div>
              </div>
          </div>
        </div>

        <div className='card-wrapper h-[32rem] w-[20rem] hover:scale-105 transition ease-in-out mt-20 '>
          <div className='card-content'>
              <div className="relative h-56">
                <img src={xToolkit} alt="X-Toolkit" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">X-Toolkit</div>
                <p className="text-slate-500 text-base mt-2">
                A series of front-end applications implementing DOM manipulation and event listeners,
                with component-based architecture and props to manage data flow.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/X-Toolkit" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="grid grid-cols-4 ml-4 mt-1">
                    <IconWithTooltip icon={SiCreatereactapp} label="React" />
                    <IconWithTooltip icon={FaHtml5} label="HTML" />
                    <IconWithTooltip icon={FaCss3Alt} label="CSS" />
                    <IconWithTooltip icon={FaJs} label="JavaScript" />
                  </div>
              </div>
          </div>
        </div>

        <div className='card-wrapper h-[32rem] w-[20rem] hover:scale-105 transition ease-in-out mt-20 '>
          <div className='card-content'>
              <div className="relative h-56">
                <img src={androidPack} alt="Android-Pack" className="object-cover w-full h-full rounded-t-2xl" />
              </div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mt-2">Android-Pack</div>
                <p className="text-slate-500 text-base mt-2">
                Multiple question bank applications with object-oriented programming principles and design patterns to
                enhance code readability and maintainability.
                </p>
              </div>
              <div className="flex mt-3">
                <a href="https://github.com/ch3ngZ/Android-Pack" target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-700 hover:transition hover:ease-in-out text-white font-normal py-2 px-4 ml-5 rounded transition ease-in-out">
                    Read More
                  </button></a>
                  <div className="grid grid-cols-4 ml-4 mt-1">
                    <IconWithTooltip icon={FaJava} label="Java" />
                    <IconWithTooltip icon={FaAndroid} label="Android" />
                    <IconWithTooltip icon={FaFigma} label="Figma" />
                    <IconWithTooltip icon={SiCanva} label="Canva" />
                  </div>
              </div>
          </div>
        </div>

        {/* <div className='card-wrapper h-[32rem] w-[20rem] hover:scale-105 transition ease-in-out mt-20'>
          <div className='card-content'>
              <div className="relative h-56">
                <img src={ToBeContinued} alt="?" className="object-cover w-full h-full rounded-t-2xl" />
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
        </div> */}
      </div>

    </section>
    );
}



export default Projects;

