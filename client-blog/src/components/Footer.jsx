import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = ({ theme }) => {
    let delay = 3000;
    let lastClick = 0;
    const [isExploding, setIsExploding] = useState(false);

    const handleConfetti = () => {
        if (lastClick >= (Date.now() - delay)){
            return;
        }
        lastClick = Date.now();

        setIsExploding(true);
        setTimeout(() => {
            setIsExploding(false);
            
        }, 1500);
    }
    return (
        <div className={`${theme.card.footer} bg-opacity-70 backdrop-blur-lg shadow-lg pb-6 bg-blend-multiply`}>
        <div className='flex justify-center'>{isExploding && <ConfettiExplosion height={2000} width={2000} />}</div>
        <footer className={` p-6 h-36 space-y-5`}>
            <div className="flex justify-center items-center ml-6 -mb-2 ">
                <ul className="flex justify-center text-3xl space-x-3 md:space-x-7 mt-5">
                <li>
                    <a href="https://www.linkedin.com/in/chezeng" target="_blank" rel="noopener noreferrer" className='text-gray-600 hover:text-4xl hover:scale-105 hover:text-black transition-all duration-300 ease-in-out'>
                        <FaLinkedin className="tech-icons"/>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/chezeng" target="_blank" rel="noopener noreferrer" className='text-gray-600 hover:text-4xl hover:scale-105 hover:text-black transition-all duration-300 ease-in-out'>
                        <FaGithub className="tech-icons"/>
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/@chezeng" target="_blank" rel="noopener noreferrer" className='text-gray-600 hover:text-4xl hover:scale-105 hover:text-black transition-all duration-300 ease-in-out'>
                        <FaYoutube className="tech-icons"/>
                    </a>
                </li>
                </ul>

            </div>
            <hr className=" dark:border-slate-700" />
            <p onClick={handleConfetti} className={`font-bold ml-5 ${theme.card.text} text-center hover:underline cursor-pointer`}>Proudly Designed by Cheng Zeng</p>
            </footer>

        </div>
    );
}


export default Footer;
