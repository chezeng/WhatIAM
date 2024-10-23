import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const Footer = () => {
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
        <>
        <div className='flex justify-center'>{isExploding && <ConfettiExplosion height={2000} width={2000} />}</div>
        
        <footer className="w-screen space-y-5 bg-black p-6 h-36">
            <div className="flex justify-between items-center ml-6 -mb-2">
                <ul className="flex text-sm text-gray-400 space-x-3 md:space-x-7 lg:space-x-10 mt-5">
                <li>
                    <a target="_blank" href="https://www.linkedin.com/in/chezeng" rel="noopener noreferrer" className="hover:underline">
                    LinkedIn
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://github.com/chezeng" className="hover:underline">
                    GitHub
                    </a>
                </li>
                <li>
                    <a target="_blank" href="https://www.youtube.com/@c3z05" className="hover:underline">
                    YouTube
                    </a>
                </li>
                </ul>

                <a href="https://blog.chengzeng.dev" className="text-sm text-gray-400 font-bold mt-6 mr-6 hover:underline" rel="noopener noreferrer">
                  【My World】
                </a>
            </div>
            <hr className="my-6 dark:border-slate-700" />
            <p onClick={handleConfetti} className="text-md font-bold text-slate-400 text-center hover:underline cursor-pointer">Created by Cheng Zeng</p>
            </footer>

        </>
    );
}


export default Footer;
