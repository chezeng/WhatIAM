import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const bannedWords = ['spamword1', 'badword', 'siteisbad'];

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomSpeed() {
  return Math.random() * 5 + 5; // 5 to 10 seconds for a slower, visible animation
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
  const usedPositions = useRef(new Set()); // Keep track of used positions to avoid overlap

  useEffect(() => {
    fetchComments();
    setLoaded(true);
    const intervalId = setInterval(fetchComments, 15000); 
    return () => clearInterval(intervalId); 
  }, []);

  const fetchComments = async () => {
    const response = await axios.get('https://server.chengzeng.dev/api/comments');
    setComments(response.data);
  };

  const getRandomPosition = () => {
    // Generate a random vertical position between 5% and 95% to avoid edges
    let top;
    do {
      top = Math.floor(Math.random() * 90) + 5;
    } while (usedPositions.current.has(top) && usedPositions.current.size < 90);

    usedPositions.current.add(top);
    setTimeout(() => usedPositions.current.delete(top), 10000); // Free position after 10 seconds
    return `${top}%`;
  };

  const handleSend = async () => {
    if (content.trim() === '') {
      setError('Content cannot be empty.');
      return;
    }

    if (content.length > 50) {
      setError('Content should not exceed 50 characters.');
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
      content,
      color: getRandomColor(),
      speed: getRandomSpeed(),
    };

    try {
      await axios.post('https://server.chengzeng.dev/api/comments', newComment);
      setComments([...comments, newComment]);
      setContent('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send comment.');
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
      {/* Background layer for comments animation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {loaded && comments.map((comment) => (
          <div
            key={uuidv4()} 
            className="absolute whitespace-nowrap text-white font-semibold text-lg"
            style={{
              color: comment.color,
              top: getRandomPosition(), 
              right: '-100%', 
              animation: `marquee ${comment.speed || getRandomSpeed()}s linear infinite`,
            }}
          >
            {comment.content}
          </div>
        ))}
      </div>
  
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        {/* Title and Subtitle */}
        <h1 className="text-4xl font-extrabold text-white mb-2">Comment System</h1>
        <p className="text-lg font-medium text-gray-300 mb-8">Leave your comments</p>
  
        {/* Input box with frosted glass effect */}
        <div className="flex items-center bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg shadow-lg space-x-4 max-w-lg w-full">
          <input
            type="text"
            placeholder="Type your comment here (max 50 characters)"
            className="w-full p-3 bg-transparent placeholder-gray-300 text-white focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Send
          </button>
        </div>
  
        {/* Error message */}
        {error && (
          <div className="text-red-500 text-sm mt-4">{error}</div>
        )}
      </div>
    </div>
  );  
}

export default CommentsPage;
