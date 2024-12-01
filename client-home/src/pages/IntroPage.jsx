import { useEffect, useState, useRef } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { useGlitch } from 'react-powerglitch';
import AOS from 'aos';
import 'aos/dist/aos.css';
import wall3 from '../assets/wall3.png';

/**
 * 
 * IntroPage.jsx
 * 
 * Intro component displays a full-screen section with a background image, an animated greeting text, 
 * and a title that changes periodically with a glitch effect. The component uses the `useGlitch` hook for 
 * the glitch effect, `AOS` for scroll animations, and `useState` and `useEffect` hooks for managing state 
 * and side effects.
 * 
 * @component
 * @example
 * return (
 *   <Intro />
 * )
 * 
 */

// Array of titles of the author to display
const titles = [
    { text: "Software Developer", color: "#FF0000", shadow: "0 0 10px #FF0000" },
    { text: "AI Enthusiast", color: "#00FFFF", shadow: "0 0 10px #00FFFF" },
    { text: "Critical Thinker", color: "#FFD3B5", shadow: "0 0 10px #FFD3B5" },
    { text: "Artistic Engineer", color: "#00FF00", shadow: "0 0 10px #00FF00" },
    { text: "Cool Video Editor", color: "#FFFF00", shadow: "0 0 10px #FFFF00" },
    { text: "Music Composer", color: "#71B3FF", shadow: "0 0 10px #71B3FF" },
];

// Display the full-screen section with background image, animated greeting text, and changing title
const Intro = () => {
    const text = `Hello! I'm Cheng!`;
    const [charStyles, setCharStyles] = useState([]);
    const [titleIndex, setTitleIndex] = useState(0);
    const titleArray = useRef(titles); 

    // Glitch configuration
    const glitch = useGlitch({
        "timing": {
            "duration": 2000,
            "easing": "ease-in-out"
        },
        "glitchTimeSpan": {
            "start": 0.8,
            "end": 1.0
        },
        "shake": {
            "velocity": 50,
        },
        "slice": {
            "velocity": 25,
        }
    });

    // Change the title with glitch every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prevIndex) => (prevIndex + 1) % titleArray.current.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Initialize AOS for scroll animations
    useEffect(() => {
        AOS.init({
            duration: 500,
            once: false, 
        });
      }, []);
    
    // Flash animation for each character in the greeting text
    useEffect(() => {
        const newCharStyles = text.split('').map( () => {
        const delay = Math.random() * 0.5;
        const duration = 0.5;
        return {
            animation: `flash ${duration}s ${delay}s forwards`
        };
        });
        setCharStyles(newCharStyles);
      }, [text]);

    return (
        <section data-aos="zoom-out" data-aos-delay="100" id='intro' className="relative w-screen h-screen bg-center bg-cover" style={{backgroundImage: `url(${wall3})`, backgroundBlendMode: 'multiply', backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
            { /* Greeting text with cool flash animation */ }
            <h1 className="relative top-60 flex justify-center text-4xl md:text-7xl text-slate-200 font-bold">
                {text.split('').map((char, index) => (
                <span key={index} style={charStyles[index]}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
                ))}
            </h1>
            
            { /* Changing title with glitch effect */ }
            <h2 className="relative changing-title text-center top-64 text-2xl md:text-5xl font-bold" style={{
                color: titleArray.current[titleIndex].color,
                textShadow: titleArray.current[titleIndex].shadow
            }}>
            <span id="glitch" ref={glitch.ref}>
                {titleArray.current[titleIndex].text}.
            </span>
            </h2>
            <div className="relative top-80 flex justify-center scroll-indicator">
                <FaArrowDown className='w-8 h-8'/>
            </div>
      </section>
    );
}


export default Intro;
