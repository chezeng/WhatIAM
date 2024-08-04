import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

const NavBar = () => {
    const [visible, setVisible] = useState(true);
    const [y, setY] = useState(window.scrollY);

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

    function scrollToTop() {
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      }

    return (
        <nav className={`z-10 w-screen h-20 flex items-center justify-between bg-black fixed transition-transform duration-300 ${visible ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
            <h1 className="text-white text-2xl ml-10 font-bold cursor-pointer hover:text-blue-500 hover:scale-110 transition duration-100 ease-out" 
            onClick={scrollToTop}> 
                Cheng Zeng
            </h1>
            <div className="flex space-x-8 mr-12"> 
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
        </nav>
    );
};

export default NavBar;