import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const bannedWords = [
  "anal", "anus", "arse", "ass", "ballsack", "balls", "bastard", "bitch",
  "biatch", "bloody", "blowjob", "blow job", "bollock", "bollok", "boner",
  "boob", "bugger", "bum", "butt", "buttplug", "clitoris", "cock", "coon",
  "crap", "cunt", "damn", "dick", "dildo", "dyke", "fag", "feck", "fellate",
  "fellatio", "felching", "fuck", "f u c k", "fudgepacker", "fudge packer",
  "flange", "Goddamn", "God damn", "hell", "homo", "jerk", "jizz", "knobend",
  "knob end", "labia", "lmao", "lmfao", "muff", "nigger", "nigga", "omg",
  "penis", "piss", "poop", "prick", "pube", "pussy", "queer", "scrotum",
  "sex", "shit", "s hit", "sh1t", "slut", "smegma", "spunk", "tit", "tosser",
  "turd", "twat", "vagina", "wank", "whore", "wtf"
];


function getRandomColor() {
  // Generating softer, more pastel colors for message backgrounds
  const hue = Math.floor(Math.random() * 360);
  const saturation = 25 + Math.random() * 25; // 25-50%
  const lightness = 75 + Math.random() * 15;  // 75-90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getRandomSpeed() {
  return Math.random() * 5 + 5;
}

function isGibberish(content) {
  const excessiveRepeats = /(.)\1{3,}/;
  const repetitiveWords = /\b(\w+)\b(?:.*\b\1\b){2,}/; 
  return excessiveRepeats.test(content) || repetitiveWords.test(content);
}

function containsProfanity(content) {
  return bannedWords.some((word) => content.toLowerCase().includes(word));
}

function CommentsPage({ theme }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const usedPositions = useRef(new Set());
  const titleRef = useRef(null);

  useEffect(() => {
    // Apply glitch effect to title
    const glitchEffect = setInterval(() => {
      if (titleRef.current) {
        const letters = titleRef.current.textContent.split('');
        const glitchedLetters = letters.map(letter => 
          Math.random() > 0.40 ? `<span class="${theme.card.text}" shadow-xl>${letter}</span>` : letter
        );
        titleRef.current.innerHTML = glitchedLetters.join('');
      }
    }, 500);

    return () => clearInterval(glitchEffect);
  }, []);

  useEffect(() => {
    fetchComments();
    setLoaded(true);
    const intervalId = setInterval(fetchComments, 9999999); 
    return () => clearInterval(intervalId); 
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://server.chengzeng.dev/api/comments');
      setComments(response.data);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      // Don't set error state here to avoid disrupting the UI
    }
  };

  const getRandomPosition = () => {
    let top;
    do {
      top = Math.floor(Math.random() * 90) + 5;
    } while (usedPositions.current.has(top) && usedPositions.current.size < 90);

    usedPositions.current.add(top);
    setTimeout(() => usedPositions.current.delete(top), 10000);
    return `${top}%`;
  };

  const handleSend = async () => {
    setError('');

    if (content.trim() === '') {
      setError('Content cannot be empty.');
      return;
    }

    if (content.length > 100) {
      setError('Content should not exceed 100 characters.');
      return;
    }

    if (containsProfanity(content)) {
      setError('Your comment contains inappropriate words.');
      return;
    }

    if (isGibberish(content)) {
      setError('Your comment seems like gibberish. Please write meaningful content.');
      return;
    }

    const newComment = {
      id: uuidv4(),
      content: content.trim(),
      timestamp: new Date().toISOString(),
      backgroundColor: getRandomColor(),
      speed: getRandomSpeed(),
    };

    try {
      await axios.post('https://server.chengzeng.dev/api/comments', {
        content: newComment.content,
        id: newComment.id,
        timestamp: newComment.timestamp
      });
      
      setComments([...comments, newComment]);
      setContent('');
    } catch (err) {
      console.error('Error sending comment:', err);
      if (err.response?.status === 400) {
        setError('Invalid comment format. Please try again.');
      } else {
        setError('Failed to send comment. Please try again later.');
      }
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})`,
        color: '#1a1a1a',
      }}
    >
      <style>
        {`
          @keyframes marquee {
            from {
              transform: translateX(100vw);
            }
            to {
              transform: translateX(-100%);
            }
          }
          
          .message-bubble {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(8px);
          }
        `}
      </style>
      
      <div className="absolute inset-0 overflow-hidden z-0">
        {loaded && comments.map((comment) => (
          <div
            key={uuidv4()} 
            className="absolute whitespace-nowrap message-bubble px-6 py-3 rounded-xl font-extrabold "
            style={{
              backgroundColor: comment.backgroundColor || getRandomColor(),
              top: getRandomPosition(),
              animation: `marquee ${comment.speed || getRandomSpeed()}s linear infinite`,
              color: '#000',
            }}
          >
            {comment.content}
          </div>
        ))}
      </div>
  
      <div className="relative z-0 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 
        ref={titleRef}
        className="text-4xl font-extrabold text-white mb-10">Leave your comments!</h1> 
  
        <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-3xl shadow-lg space-x-4 max-w-lg w-full">
          <input
            type="text"
            placeholder="Type your comment here (max 100 characters)"
            className="w-full p-3 bg-transparent placeholder-slate-600 italic text-black focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            className={`bg-slate-200 text-white hover:text-inherit font-extrabold px-6 py-3 text-xl rounded-xl bg-opacity-30 hover:scale-101 transition 
              ease-in-out duration-300 ${theme.card.ring} hover:ring-inherit ring-4 backdrop-blur-lg shadow-lg`}
          >
            Send
          </button>
        </div>
  
        {error && (
          <div className="text-red-600 text-md font-bold italic mt-4 bg-white bg-opacity-20 backdrop-blur-md px-4 py-2 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );  
}

export default CommentsPage;