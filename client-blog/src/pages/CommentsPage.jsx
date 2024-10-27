import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomSpeed() {
  return Math.random() * 5 + 2; // 2 to 7 seconds
}

const bannedWords = ['spamword1', 'badword', 'siteisbad'];

function containsProfanity(content) {
  return bannedWords.some((word) => content.toLowerCase().includes(word));
}

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const commentContainerRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await axios.get('https://server.chengzeng.dev/api/comments');
    setComments(response.data);
  };

  const handleSend = async () => {
    if (content.trim().length > 30) {
      setError('Please keep your comment under 30 words.');
      return;
    }

    if (containsProfanity(content)) {
      setError('Your comment contains inappropriate words.');
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
    <div className="flex flex-col items-center bg-gray-800 text-white min-h-screen p-4">
      <div
        className="relative w-full h-96 overflow-hidden bg-gray-900 rounded-lg"
        ref={commentContainerRef}
      >
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="absolute whitespace-nowrap"
            style={{
              color: comment.color,
              animationDuration: `${comment.speed}s`,
            }}
          >
            {comment.content}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md mt-4">
        <input
          type="text"
          placeholder="Enter your comment (1 per minute)"
          className="w-full p-2 mb-2 border rounded focus:outline-none focus:border-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}
        <button
          onClick={handleSend}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default CommentsPage;
