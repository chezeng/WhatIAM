import express from 'express';
import fs from 'fs/promises'; 
import path from 'path';
import cors from 'cors';
import 'dotenv/config';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    res.json({ message: 'Welcome to the blog API' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Blog API Error' });
  }
});

app.get('/quotes', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'quotes.json'), 'utf8');
    const quotes = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json(quotes[randomIndex]);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Error reading quotes file' });
  }
});

app.get('/articles', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'articles.json'), 'utf8');
    const articles = JSON.parse(data);
    res.json(articles);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Error reading articles file' });
  }
});

app.get('/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fs.readFile(path.join(__dirname, 'articles.json'), 'utf8');
    const articles = JSON.parse(data);
    const article = articles.find(article => article.id === parseInt(id));
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Error reading articles file' });
  }
});

app.get('/music', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'music.json'), 'utf8');
    const songs = JSON.parse(data);
    res.json(songs);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Error reading quotes file' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
