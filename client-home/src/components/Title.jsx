import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * Title.jsx
 * 
 * Title component animates a title and lines on scroll.
 * It uses the AOS (Animate On Scroll) library to initialize animations
 * and adds custom scroll-based animations to the title, left line, right line, and dot elements.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - The title text to display
 * 
 * @example
 * <Title title="My Animated Title" />
 */

const Title = ({ title }) => {
  // Configuration for each animated element of the title
  const titleRef = useRef(null);
  const leftLineRef = useRef(null);
  const rightLineRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Initialize AOS library with custom configuration
    AOS.init({
      duration: 500,
      once: false,
    });

    const handleScroll = () => {
      const titleElement = titleRef.current;
      const leftLineElement = leftLineRef.current;
      const rightLineElement = rightLineRef.current;
      const dotElement = dotRef.current;

      // Check if the title is visible in the viewport. If so, add animation classes
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
    <div className="relative flex justify-center items-center mt-10">
      <div ref={dotRef} className="absolute bg-white rounded-full z-10 mt-4 md:mt-9" style={{ width: '10px', height: '10px' }}></div>
      <div ref={leftLineRef} className="absolute h-[2px] bg-white mr-5 mt-4 md:mt-9" style={{ width: '0', right: 'calc(50% + 5px)' }}></div>
      <div ref={rightLineRef} className="absolute h-[2px] bg-white ml-5 mt-4 md:mt-9" style={{ width: '0', left: 'calc(50% + 5px)' }}></div>
      <h1 ref={titleRef} className="absolute -top-12 md:-top-18 text-3xl md:text-6xl font-bold opacity-0 transition-all duration-500">{title}</h1>
    </div>
  );
};

export default Title;
