import React, { useEffect, useState, useRef, useMemo } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { useGlitch } from 'react-powerglitch';
import AOS from 'aos';
import 'aos/dist/aos.css';

const titles = [
    { text: "Software Developer", color: "#FF0000", shadow: "0 0 10px #FF0000" },
    { text: "AI Enthusiast", color: "#00FFFF", shadow: "0 0 10px #00FFFF" },
    { text: "Computer Science Student", color: "#FFD3B5", shadow: "0 0 10px #FFD3B5" },
    { text: "Infamous Youtuber", color: "#00FF00", shadow: "0 0 10px #00FF00" },
    { text: "Cool Video Editor", color: "#FFFF00", shadow: "0 0 10px #FFFF00" },
    { text: "Music Composer", color: "#71B3FF", shadow: "0 0 10px #71B3FF" },
];

const Intro = () => {
    const text = `Hello! I'm Cheng!`;
    const [charStyles, setCharStyles] = useState([]);
    const [titleIndex, setTitleIndex] = useState(0);
    const titleArray = useRef(titles); 

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

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prevIndex) => (prevIndex + 1) % titleArray.current.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 500,
            once: false, 
        });
      }, []);

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
        <section data-aos="zoom-out" data-aos-delay="100" id='intro' className="relative w-screen h-screen bg-center bg-cover" style={{backgroundImage: `url(/src/assets/wall3.png)`, backgroundBlendMode: 'multiply', backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
            <h1 className="relative top-60 flex justify-center text-5xl md:text-7xl text-slate-200 font-bold">
                {text.split('').map((char, index) => (
                <span key={index} style={charStyles[index]}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
                ))}
            </h1>

            <h2 className="relative changing-title text-center top-65 md:text-5xl text-3xl font-bold" style={{
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