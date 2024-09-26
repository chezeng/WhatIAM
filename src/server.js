// import { connect, Schema, model } from 'mongoose';

// connect('mongodb://localhost:5173/', {
//     dbName: 'WhatIAM',
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, err => err ? console.log(err) : 
//     console.log('Connected to WhatIAM database'));

// // Schema for users of app
// const UserSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     message: {
//         type: String,
//         required: true,
//     },
// });
// const User = model('users', UserSchema);
// User.createIndexes();

// // For backend and express
// import express, { json } from 'express';

// const app = express();
// import cors from "cors";
// console.log("App listen at port 5173");
// app.use(json());
// app.use(cors());

// app.get("/", (req, resp) => {
//     resp.send("App is Working");
// });

// app.post("/submit", async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const database = await connectToDatabase();
//     const collection = client.db('form_submissions');

//     await collection.insertOne({ name, email, message, createdAt: new Date() });

//     res.status(200).json({ message: 'Form submitted successfully' });
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     res.status(500).json({ error: 'Error submitting form' });
//   }

// });

// app.listen(5173);


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5173, () => console.log('App listen at port 5173'));
