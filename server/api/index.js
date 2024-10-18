import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import matter from 'gray-matter';
import axios from 'axios';
import { marked } from 'marked';

dotenv.config();

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function getArticleFileNames() {
  try {
    const response = await axios.get(`https://chezeng.github.io/Media/WhatIAM/articles/articles.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article filenames:', error);
    return [];
  }
}

// Helper function to fetch and parse individual markdown files
async function getArticleContent(filename) {
  try {
    const url = `https://chezeng.github.io/Media/WhatIAM/articles/${filename}.md`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch article: ${filename}`);
    }

    const fileContent = response.data;
    const { data: metadata, content } = matter(fileContent); 
    return {
      ...metadata,
      content: marked.parse(content), 
    };
  } catch (error) {
    console.error('Error fetching article content:', error);
    throw new Error(`Error fetching article: ${filename}`);
  }
}

// API to fetch all articles and metadata
app.get('/api/articles', async (req, res) => {
  try {
    const filenames = await getArticleFileNames();
    if (!filenames || filenames.length === 0) {
      return res.status(404).json({ message: 'No articles found' });
    }

    const articlePromises = filenames.map(filename => getArticleContent(filename));
    const articles = await Promise.all(articlePromises);
    res.json(articles); 
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
});

// API to fetch quotes from GitHub
app.get('/api/quotes', async (req, res) => {
  try {
    const response = await axios.get(`https://chezeng.github.io/Media/WhatIAM/quotes/quotes.json`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Error fetching quotes' });
  }
});

// API to fetch music from GitHub
app.get('/api/music', async (req, res) => {
  try {
    const response = await axios.get(`https://chezeng.github.io/Media/WhatIAM/music/music.json`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching music:', error);
    res.status(500).json({ message: 'Error fetching music' });
  }
});



const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', ContactSchema);

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

export default app;
