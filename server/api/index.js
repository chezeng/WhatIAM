import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs/promises'; 
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import rateLimit from 'express-rate-limit';

import { put } from "@vercel/blob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = 3000; 
app.use(cors());
app.use(express.json());

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

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Cheng Zeng \'s API realm.' });
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

app.get('/api/quotes', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/quotes.json'), 'utf8'); 
    const quotes = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json(quotes[randomIndex]);
  } catch (err) {
    console.error('Error reading quotes file:', err);
    res.status(500).json({ message: 'Error reading quotes file' });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/articles.json'), 'utf8');
    const articles = JSON.parse(data);
    res.json(articles);
  } catch (err) {
    console.error('Error reading articles file:', err);
    res.status(500).json({ message: 'Error reading articles file' });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(path.join(__dirname, 'data/articles.json'), 'utf8');
    const articles = JSON.parse(data);
    const article = articles.find(article => article.id === parseInt(id));
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (err) {
    console.error('Error reading articles file:', err);
    res.status(500).json({ message: 'Error reading articles file' });
  }
});

app.get('/api/music', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/music.json'), 'utf8');
    const songs = JSON.parse(data);
    res.json(songs);
  } catch (err) {
    console.error('Error reading music file:', err);
    res.status(500).json({ message: 'Error reading music file' });
  }
});

export default app;
