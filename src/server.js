import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const MONGODB_URI = "mongodb+srv://Cheng:Cheng0125@whatiam.gyg9d.mongodb.net/?retryWrites=true&w=majority&appName=WhatIAM";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define the schema for contact form submissions
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// Create a model based on the schema
const Contact = mongoose.model('Contact', ContactSchema);

// Route to handle form submissions
app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Message received! I\'ll be in touch as soon as possible.' });
  } catch (error) {
    console.error('Error saving contact form:', error);
    res.status(500).json({ message: 'An error occurred while submitting the form.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

export default app;