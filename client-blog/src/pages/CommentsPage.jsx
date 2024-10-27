import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function CommentsPage( { theme }) {
  const [comments, setComments] = useState([]); 
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [color, setColor] = useState('#ffffff'); 
  const [speed, setSpeed] = useState(5);
  const commentContainerRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await axios.get('/api/comments');
    setComments(response.data);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await axios.post('/api/upload-avatar', formData);
    setAvatar(response.data.avatarUrl);
  };

  const handleSend = async () => {
    if (content.trim().length > 30) {
      alert('Please keep your comment under 30 words.');
      return;
    }

    const newComment = {
      id: uuidv4(),
      username,
      content,
      avatar,
      color,
      speed,
    };

    await axios.post('/api/comments', newComment);
    setComments([...comments, newComment]);
    setContent('');
  };

  return (
    // <div className="h-svh grid grid-rows-2 md:space-y-40 lg:space-y-0 sm:grid-cols-2 px-20 items-center pt-20 sm:pt-48" style={{ background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})`}}>
      <div className="comments-page">
        <div className="comments-container" ref={commentContainerRef}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="comment-bubble"
              style={{
                color: comment.color,
                animationDuration: `${comment.speed}s`,
              }}
            >
              <img src={comment.avatar} alt="avatar" className="avatar" />
              <div className="comment-content">
                <div className="username">{comment.username}</div>
                <div className="content">{comment.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="file"
            onChange={handleAvatarUpload}
            accept="image/*"
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <input
            type="text"
            placeholder=""
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSend}>Send</button>
        </div>
    </div>
  );
}

export default CommentsPage;
