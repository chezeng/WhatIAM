import React, { useState, useEffect } from 'react';

const NavBar = () => {
    const [visible, setVisible] = useState(true);
    const [y, setY] = useState(window.scrollY);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY < y) {
            setVisible(true);
          } else {
            setVisible(false);
          }
          setY(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
        
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [y]);

      const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
      };
  
    return (
        <nav className={`z-10 w-screen h-20 flex items-center justify-between bg-black fixed transition-transform duration-300 ${visible ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
          <h1 className="text-white text-xl md:text-2xl ml-10 font-bold cursor-pointer hover:text-blue-500 hover:scale-110 transition duration-100 ease-out" 
          onClick={() => scrollToSection('intro')}> 
              Cheng Zeng
          </h1>
          <div className="hidden sm:flex space-x-8 mr-12 text-xl"> 
            <p className='text-white font-bold cursor-pointer hover:text-blue-500 hover:scale-110 transition' onClick={() => scrollToSection('about')}>About</p>
            <p className='text-white font-bold cursor-pointer hover:text-blue-500 hover:scale-110 transition' onClick={() => scrollToSection('projects')}>&nbsp;Projects</p>
            <p className='text-white font-bold cursor-pointer hover:text-blue-500 hover:scale-110 transition' onClick={() => scrollToSection('contact')}>Contact</p>
          </div>

          <button className="sm:hidden absolute w-7 h-7 cursor-pointer right-10" onClick={() => setToggle(!toggle)}>
            <div className={`absolute w-full h-[2px] bg-white rounded-full transform transition duration-500 ${toggle ? "rotate-90" : "top-1.5"}`} />
            <div className={`absolute w-full h-[2px] bg-white rounded-full transform transition duration-505 ${toggle ? "rotate-90" : "top-3.5"}`} />
            <div className={`absolute w-full h-[2px] bg-white rounded-full transform transition duration-510 ${toggle ? "rotate-90" : "top-5.5"}`} />
          </button>
          
          <div className={`sm:hidden absolute text-center flex-col items-center space-y-3 top-24 -right-24 w-28 px-5 py-3 rounded-xl bg-black border-white border-2 transition transform duration-300 ease-in-out ${!toggle ? 'translate-x-20' : '-translate-x-full'}`}>
            <p className='text-white font-bold cursor-pointer hover:text-blue-500 transition' onClick={() => scrollToSection('about')}>About</p>
            <p className='text-white font-bold cursor-pointer hover:text-blue-500 transition' onClick={() => scrollToSection('projects')}>Projects</p>
            <p className='text-white font-bold cursor-pointer hover:text-blue-500 transition' onClick={() => scrollToSection('contact')}>Contact</p>
          </div>        
        </nav>
    );
};

export default NavBar;