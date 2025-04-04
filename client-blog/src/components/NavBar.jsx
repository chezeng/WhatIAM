import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * NavBar.jsx
 * 
 * NavBar component with responsive, scroll-aware navigation.
 * Implements dynamic visibility and mobile-friendly menu toggle.
 * 
 * @returns {JSX.Element} Rendered navigation bar
 */

const NavBar = ( { theme }) => {
    const [visible, setVisible] = useState(true);
    const [y, setY] = useState(window.scrollY);
    const [toggle, setToggle] = useState(false);

  // Optimize navbar visibility by comparing current and previous scroll positions
    useEffect(() => {
      const handleScroll = () => {
        setVisible(window.scrollY < y);
        setY(window.scrollY);
      };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [y]);
    

    const scrollToSection = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <nav className={`z-10 w-screen h-14 flex items-center justify-between bg-transparent fixed transition-transform duration-300 ${visible ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
            {/* Logo - Smooth scroll to the top section */}
            <h1 className={`hover:text-black ${theme.card.text} text-xl ml-10 font-extrabold cursor-pointer hover:scale-105 transition duration-200 ease-out`} 
            onClick={() => scrollToSection('top')}> 
                Cheng Zeng's Blogs
            </h1>

            {/* Navigation Links (Desktop View) */}
            <div className="hidden sm:flex space-x-8 mr-12 text-lg align-middle"> 
                <p className={`hover:text-black font-extrabold cursor-pointer ${theme.card.text} hover:scale-105 transition`}><Link to="/">Home</Link></p>
                <p className={`hover:text-black  font-extrabold cursor-pointer ${theme.card.text} hover:scale-105 transition`}><Link to="/About">About</Link></p>
                <p className={`hover:text-black font-extrabold cursor-pointer ${theme.card.text} hover:scale-105 transition`}><Link to="/Comments">Comments</Link></p>
            </div>

            {/* Navigation Links (Mobile View) */}
            <button className="sm:hidden absolute w-7 h-7 cursor-pointer right-7" onClick={() => setToggle(!toggle)}>
                <div className={`absolute w-full h-[2px] bg-white rounded-full transform transition duration-500 ${toggle ? "rotate-90" : "top-1.5"}`} />
                <div className={`absolute w-full h-[2px] bg-white rounded-full transform transition duration-505 ${toggle ? "rotate-90" : "top-3.5"}`} />
                <div className={`absolute w-full h-[2px] bg-white rounded-full transform transition duration-510 ${toggle ? "rotate-90" : "top-5.5"}`} />
            </button>

            {/* Mobile Menu */}
            <div className={`${theme.card.bg} sm:hidden absolute text-center flex-col items-center space-y-3 top-24 -right-24 w-32 px-3 py-5 rounded-xl bg-opacity-50 backdrop-blur-lg shadow-lg border-white border-4 transition transform duration-300 ease-in-out ${!toggle ? 'translate-x-20' : '-translate-x-full'}`}>
                <p className={`hover:text-black font-extrabold cursor-pointer ${theme.card.text} hover:scale-105 transition`} onClick={() => setToggle(!toggle)}><Link to="/">Home</Link></p>
                <p className={`hover:text-black font-extrabold cursor-pointer ${theme.card.text} hover:scale-105 transition`} onClick={() => setToggle(!toggle)}><Link to="/About">About</Link></p>
                <p className={`hover:text-black font-extrabold cursor-pointer ${theme.card.text} hover:scale-105 transition`} onClick={() => setToggle(!toggle)}><Link to="/Comments">Comments</Link></p>
            </div>        
        </nav>
    );
};

export default NavBar;
