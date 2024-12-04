import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

/**
 * Footer.jsx
 * 
 * Footer component that displays social links, a blog link, and an attribution message.
 * Includes a confetti explosion effect that can be triggered by clicking the attribution message.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */

const Footer = () => {
  const confettiDuration = 1500;
  const clickCooldown = 3000; // Minimum delay to prevent rapid triggering
  let lastClickTimestamp = 0;

  const [isExploding, setIsExploding] = useState(false);


  const handleConfetti = () => {
    /**
     * Ensures the effect is rate-limited to prevent rapid triggering by 
     * checking the time elapsed since the last click. 
     */
    const now = Date.now(); 
    if (lastClickTimestamp >= now - clickCooldown) {
      return; // Prevent triggering if still within cooldown period
    }
    lastClickTimestamp = now; 

    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false); 
    }, confettiDuration);
  };

  return (
    <>
      {/* Confetti Explosion Effect */}
      <div className="flex justify-center">
        {isExploding && (
          <ConfettiExplosion
            height={2000}
            width={2000}
          />
        )}
      </div>

      {/* Footer Section */}
      <footer className="w-screen space-y-5 bg-black p-6 h-40">
        {/* Social Links and Blog */}
        <div className="flex justify-between items-center ml-6 -mb-2">
          <ul className="flex text-sm text-gray-400 space-x-3 md:space-x-7 lg:space-x-10 mt-5">
            <li>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/chezeng"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/chezeng"
                className="hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.youtube.com/@chezeng"
                className="hover:underline"
              >
                YouTube
              </a>
            </li>
          </ul>

          <a
            href="https://blog.chengzeng.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transition-all duration-200 ease-in-out text-sm bg-clip-text text-transparent font-extrabold mt-6 mr-6
            bg-gradient-to-r from-pink-500 to-yellow-500"
          >
            【My World】
          </a>
        </div>

        {/* Separator */}
        <hr className="my-6 dark:border-slate-700" />

        {/* "Created by" Attribution with Confetti */}
        <p
          onClick={handleConfetti}
          className="text-md font-bold text-slate-400 text-center hover:underline cursor-pointer"
        >
          Created by Cheng Zeng
        </p>
      </footer>
    </>
  );
};

export default Footer;
