import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { Link } from 'react-router-dom';

/**
 * Footer.jsx
 * 
 * Footer component displays a footer section with navigation links and a confetti explosion effect.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.theme - The theme object containing styling classes.
 * 
 * @returns {JSX.Element} The rendered Footer component.
 */

const Footer = ({ theme }) => {
    let delay = 3000;
    let lastClick = 0;
    const [isExploding, setIsExploding] = useState(false);

    const handleConfetti = () => {
        // Prevent multiple clicks within the delay time
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
        <footer className="p-6 h-36 space-y-5">
            <ul className="italic flex justify-center text-lg space-x-7 mt-5 -mb-4">
                <li>
                    <p className={`font-bold text-black hover:underline duration-300 transition ease-in-out`}><Link to="/">Home</Link></p>
                </li>   
                <li>
                    <p className={`font-bold text-black hover:underline duration-300 transition ease-in-out`}><Link to="/About">About</Link></p>
                </li>
                <li>
                    <p className={`font-bold text-black hover:underline duration-300 transition ease-in-out`}><Link to="/Comments">Comments</Link></p>
                </li>
            </ul>

            <hr className="border-black" />
            <p onClick={handleConfetti} className={`font-extrabold ${theme.card.text} text-center hover:underline cursor-pointer italic`}>Proudly Designed by Cheng Zeng</p>
            </footer>
        </div>
    );
}


export default Footer;
