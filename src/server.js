import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors({
  origin: process.env.VITE_FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// MongoDB URI and Client Setup
const uri = process.env.MONGODB_URI;
let client;

// Connect to MongoDB
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
  }
  return client.db('whatiam');
}

// Handle form submissions
app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const database = await connectToDatabase();
    const collection = database.collection('form_submissions');

    await collection.insertOne({ name, email, message, createdAt: new Date() });

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Error submitting form' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Graceful shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});