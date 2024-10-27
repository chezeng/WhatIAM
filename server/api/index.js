import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import axios from 'axios';
import { marked } from 'marked';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Contact schema and model
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  id: String,
  content: String,
  color: String,
  speed: Number,
});

const Contact = mongoose.model('Contact', ContactSchema);
const Comment = mongoose.model('Comment', commentSchema);

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10,
  message: { error: 'Too many requests from this IP, please try again after a minute.' },
});

app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

app.post('/api/comments', limiter, async (req, res) => {
  const { content, color, speed } = req.body;

  if (!content || content.length > 30) {
    return res.status(400).json({ error: 'Invalid comment' });
  }

  const bannedWords = ['spamword1', 'badword', 'siteisbad'];
  
  if (bannedWords.some((word) => content.toLowerCase().includes(word))) {
    return res.status(400).json({ error: 'Your comment contains inappropriate words.' });
  }

  const newComment = new Comment({
    id: uuidv4(),
    content,
    color,
    speed,
  });

  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save comment' });
  }
});

async function getArticleContent(id) {
  try {
    const url = `https://chezeng.github.io/Media/WhatIAM/articles/${id}.md`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch article: ${id}`);
    }

    const fileContent = response.data;
    return {
      content: marked.parse(fileContent),
    };
  } catch (error) {
    console.error('Error fetching article content:', error);
    throw error;
  }
}

// API endpoints
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await axios.get('https://chezeng.github.io/Media/WhatIAM/articles/articles.json').data;
    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: 'No articles found' });
    }
    res.json(articles); 
  } catch (error) {
    console.error('Error fetching article previews:', error);
    res.status(500).json({ message: 'Error fetching article previews' });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await getArticleContent(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error('Error fetching article content:', error);
    res.status(500).json({ message: 'Error fetching article content' });
  }
});

app.get('/api/quotes', async (req, res) => {
  try {
    const response = await axios.get('https://chezeng.github.io/Media/WhatIAM/quotes/quotes.json');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Error fetching quotes' });
  }
});

// Rate limiting for contact form submissions
const contactFormLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: {
    message: 'Too many requests from this IP, please try again after a minute.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/submit-form', contactFormLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ message: 'An error occurred while submitting the form.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;