import { useState, useEffect, useRef } from 'react';
import { FaAngleRight, FaAngleLeft, FaSyncAlt, FaStop, FaBars, FaPlay } from "react-icons/fa";
import { motion } from 'framer-motion';

/**
 * MusicPlayer.jsx
 * 
 * MusicPlayer component provides a music player interface with play, pause, next, previous, and looping functionalities.
 * It fetches a list of music tracks from a remote JSON file and allows users to play and navigate through the tracks.
 * The player can be expanded or collapsed, and a list of tracks can be toggled for visibility.
 *
 * @component
 * @example
 * return (
 *   <MusicPlayer />
 * )
 *
 * @returns {JSX.Element} The rendered MusicPlayer component.
 */

const MusicPlayer = () => {
  const [musicList, setMusicList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [isListVisible, setIsListVisible] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  // Fetch music list from remote JSON file
  useEffect(() => {
    fetch('https://chezeng.github.io/Media/WhatIAM/quotes/music.json')
      .then((response) => response.json())
      .then((data) => {
        setMusicList(data);  
        render(data[0]);    
      })
      .catch((error) => {
        console.error('Error fetching music list:', error);
      });
  }, []);

  const render = (data) => {
    if (audioRef.current) {
      audioRef.current.src = `https://chezeng.github.io/Media/WhatIAM/quotes/${encodeURIComponent(data.id)}.mp3`;
    }
  };

  const formatTime = (time) => {
    const min = String(Math.floor(time / 60)).padStart(2, '0');
    const sec = String(Math.floor(time % 60)).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime || 0;
    const duration = audioRef.current.duration || 0;
    document.querySelector('.current-time').textContent = formatTime(currentTime);
    document.querySelector('.music_progress_line').style.width = `${(currentTime / duration) * 100}%`;
  };

  const handleEnded = () => {
    if (isLooping) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      const nextIndex = (currentIndex + 1) % musicList.length; 
      setCurrentIndex(nextIndex);
      render(musicList[nextIndex]);
  
      if (nextIndex !== 0 || musicList.length === 1) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  };

  const handleSeekStart = () => {
    setIsDragging(true);
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = (clickX / rect.width) * 100;
      setProgress(newProgress);
    }
  };

  const handleSeekEnd = (e) => {
    if (audioRef.current) {
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress((newTime / audioRef.current.duration) * 100);
    }
    setIsDragging(false);
  };

  const togglePlayer = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  return (
    <div>
      {/* Player Container */}
      <motion.div
        className="fixed top-28 right-3 z-50 flex items-center"
        initial={{ x: 'calc(100% - 3rem)', opacity: 1 }}
        animate={{ x: isExpanded ? 0 : 'calc(100% - 3rem)' }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        {/* Arrow Button */}
        <motion.div
          className="flex justify-center items-center bg-slate-200 transition ease-in-out hover:bg-white text-gray-700 cursor-pointer p-2 shadow-lg rounded-xl opacity-80 iphone:mr-3 ssm:mr-0"
          onClick={togglePlayer}
          transition={{ type: 'spring', stiffness: 100, damping: 10, repeat: 1, repeatType: 'mirror' }}
        >
          {isExpanded ? (
            <motion.div initial={{ rotate: 0 }} animate={{ rotate: isExpanded ? 0 : 180 }}>
              <FaAngleRight className="text-2xl" />
            </motion.div>
          ) : (
            <motion.div initial={{ rotate: 0 }} animate={{ rotate: isExpanded ? 0 : 360 }}>
              <FaAngleLeft className="text-2xl" />
            </motion.div>
          )}
        </motion.div>

        {/* Music Player */}
        <motion.div
          className="select-none bg-white bg-opacity-50 backdrop-blur-lg p-4 shadow-2xl rounded-xl"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: isExpanded ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {/* Cover Image */}
          <div className="flex items-center justify-between">
            <div className="relative cover w-24 h-24 bg-white rounded-full border-4 border-white mx-auto mt-[-60px]">
              <img
                src={musicList[currentIndex]?.cover || ''}
                alt="Cover"
                className="w-full h-full rounded-full animate-spin-slow"
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
              />
            </div>

            {/* Play, Loop, and List Buttons */}
            <div className="flex space-x-4">
              <button onClick={handlePlayPause} className="ml-4 text-xl p-2 text-gray-700 hover:bg-gray-200 rounded-full transition ease-in-out duration-200">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: isExpanded ? 0 : 360,
                    transition: { type: 'spring', stiffness: 100 },
                  }}>
                  {isPlaying ? <FaStop /> : <FaPlay />}
                </motion.div>
              </button>

              <button onClick={toggleLoop} className={`text-xl p-2 rounded-full transition ease-in-out duration-200 ${isLooping ? 'text-blue-500' : 'text-gray-700 hover:bg-gray-200'}`}>
                <motion.div initial={{ rotate: 0 }} animate={{ rotate: isExpanded ? 0 : 360 }}>
                  <FaSyncAlt />
                </motion.div>
              </button>

              <button onClick={toggleListVisibility} className="text-2xl p-2 text-gray-700 hover:bg-gray-200 rounded-full transition ease-in-out duration-200">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: isExpanded ? 0 : 360,
                    transition: { type: 'spring', stiffness: 100 },
                  }}>
                  <FaBars className="text-2xl" />
                </motion.div>
              </button>
            </div>
          </div>

          {/* Music Info */}
          <div className="mt-4">
            <div className="text-black text-lg font-extrabold">{musicList[currentIndex]?.name}</div>
            <div className="text-gray-500">{musicList[currentIndex]?.singer}</div>
            <div className="mt-2">
              <div className="flex justify-between text-blue-500">
                <span className="current-time">00:00</span>
                <span className="time">{musicList[currentIndex]?.time}</span>
              </div>
              <div
                className="relative mt-1 h-1 bg-gray-300 rounded-full music_progress_bar"
                onMouseDown={handleSeekStart}
                onMouseMove={(e) => isDragging && handleSeek(e)}
                onMouseUp={handleSeekEnd}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 music_progress_line"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Music list */}
          {isListVisible && (
            <motion.div
              className="mt-4 bg-gray-100 rounded-lg shadow-inner p-4 max-h-60 overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-2">
                {musicList.map((item, index) => (
                  <li
                    key={index}
                    className={`flex justify-between font-bold items-center p-2 rounded-lg cursor-pointer ${index === currentIndex ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-100 '}`}
                    onClick={() => {
                      if (index !== currentIndex) {
                        setCurrentIndex(index);
                        render(item);
                        setIsPlaying(true);
                        audioRef.current.play();
                      }
                    }}
                  >
                    <span>{`0${index + 1}. ${item.name}`}</span>
                    <span className={`fa ${index === currentIndex && isPlaying ? 'fa-pause-circle' : 'fa-play-circle'}`}></span>
                  </li>
                ))}
              </ul>
              <p className='text-slate-300 italic mt-5 ml-11'>Designed by Cheng</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />
    </div>
  );
};

export default MusicPlayer;
