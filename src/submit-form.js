import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = new MongoClient(process.env.MONGODB_URI);

    try {
      await client.connect();
      const database = client.db('your_database_name');
      const collection = database.collection('form_submissions');

      await collection.insertOne({
        name,
        email,
        message,
        createdAt: new Date()
      });

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ error: 'Error submitting form' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}