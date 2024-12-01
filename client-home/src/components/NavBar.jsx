import { useState, useEffect } from 'react';

/**
 * NavBar.jsx
 * 
 * NavBar component with responsive, scroll-aware navigation.
 * Implements dynamic visibility and mobile-friendly menu toggle.
 * 
 * @returns {JSX.Element} Rendered navigation bar
 */

const NavBar = () => {
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

  const scrollAndToggle = (id) => {
    scrollToSection(id);
    setToggle(!toggle); 
  };

  return (
    <nav
      className={`z-10 w-screen h-20 flex items-center justify-between bg-black fixed transition-transform duration-300 ${
        visible ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
    >
      {/* Logo - Smooth scroll to the intro section */}
      <h1
        onClick={() => scrollToSection('intro')}
        className="text-white text-xl md:text-2xl ml-10 font-bold cursor-pointer hover:text-blue-500 hover:scale-110 transition duration-100 ease-out"
      >
        Cheng Zeng
      </h1>

      {/* Navigation Links (Desktop View) */}
      <div className="hidden sm:flex space-x-10 mr-12 text-xl">
        <p
          className="text-white font-bold cursor-pointer hover:text-blue-500 hover:scale-110 transition mr-2"
          onClick={() => scrollToSection('about')}
        >
          About
        </p>
        <p
          className="text-white font-bold cursor-pointer hover:text-blue-500 hover:scale-110 transition"
          onClick={() => scrollToSection('projects')}
        >
          Projects
        </p>
        <p
          className="text-white font-bold cursor-pointer hover:text-blue-500 hover:scale-110 transition"
          onClick={() => scrollToSection('contact')}
        >
          Contact
        </p>
      </div>

      {/* Hamburger Menu Button (Mobile View) */}
      <button
        className="sm:hidden absolute w-7 h-7 cursor-pointer right-10"
        onClick={() => setToggle(!toggle)}
      >
        {/* Hamburger Icon with Transform Animations */}
        <div
          className={`absolute w-full h-[2px] bg-white rounded-full transform transition duration-500 ${
            toggle ? 'rotate-90' : 'top-1.5'
          }`}
        />
        <div
          className={`absolute w-full h-[2px] bg-white rounded-full transform transition duration-505 ${
            toggle ? 'rotate-90' : 'top-3.5'
          }`}
        />
        <div
          className={`absolute w-full h-[2px] bg-white rounded-full transform transition duration-510 ${
            toggle ? 'rotate-90' : 'top-5.5'
          }`}
        />
      </button>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden absolute text-center flex-col items-center space-y-3 top-24 -right-24 w-28 px-5 py-3 rounded-xl bg-black border-white border-2 transition transform duration-300 ease-in-out ${
          toggle ? '-translate-x-full' : 'translate-x-20'
        }`}
      >
        <p
          className="text-white font-bold cursor-pointer hover:text-blue-500 transition"
          onClick={() => scrollAndToggle('about')}
        >
          About
        </p>
        <p
          className="text-white font-bold cursor-pointer hover:text-blue-500 transition"
          onClick={() => scrollAndToggle('projects')}
        >
          Projects
        </p>
        <p
          className="text-white font-bold cursor-pointer hover:text-blue-500 transition"
          onClick={() => scrollAndToggle('contact')}
        >
          Contact
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
