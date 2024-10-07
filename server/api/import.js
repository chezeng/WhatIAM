import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
  
const ArticleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  date : String,
  preview: String,
  content: String,
  labels: [String]
});

const Article = mongoose.model('Article', ArticleSchema);

async function importArticles() {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/articles.json'), 'utf8');
    const articles = JSON.parse(data);

    for (const article of articles) {
      const newArticle = new Article({
        id: article.id,
        title: article.title,
        image: article.image,
        date: article.date,
        preview: article.preview,
        content: article.content,
        labels: article.labels
      });
      await newArticle.save();
      console.log(`Article ${article.title} saved to MongoDB`);
    }

    console.log('All articles imported successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error importing articles:', err);
    process.exit(1);
  }
}

importArticles();

