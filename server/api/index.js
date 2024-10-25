import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import axios from 'axios';
import { marked } from 'marked';
// import commentsRoute from '../api/comments.js';
// import uploadAvatarRoute from '../api/upload-avatar.js';
// import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/comments', commentsRoute);
// app.use('/api/upload-avatar', uploadAvatarRoute);

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

const Contact = mongoose.model('Contact', ContactSchema);

// Helper functions
async function getArticlePreviews() {
  try {
    const response = await axios.get('https://chezeng.github.io/Media/WhatIAM/articles/articles.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching article previews:', error);
    return [];
  }
}

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


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Cheng Zeng \'s API realm.' });
});

// API endpoints
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await getArticlePreviews();
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

app.get('/api/music', async (req, res) => {
  try {
    const response = await axios.get('https://chezeng.github.io/Media/WhatIAM/music/music.json');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching music:', error);
    res.status(500).json({ message: 'Error fetching music' });
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