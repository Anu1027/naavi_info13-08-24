require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const { GridFSBucket } = require('mongodb');
const { Email } = require('./models'); // Import the Email model

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Use Helmet for security
app.use(helmet());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB database.');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  });

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  // Initialize GridFSBucket
  const bucket = new GridFSBucket(conn.db, {
    bucketName: 'pdfs'
  });

  gfs = bucket;

  // Upload PDFs after the connection is open
  uploadPdfToDB('AI-METHODLOGY.pdf', path.join(__dirname, 'Papers', 'AI-METHODLOGY.pdf'));
  uploadPdfToDB('KGs+LLMs.pdf', path.join(__dirname, 'Papers', 'KGs+LLMs.pdf'));
  uploadPdfToDB('DP-OPT.pdf', path.join(__dirname, 'Papers', 'DP-OPT.pdf'));
});

// Function to upload PDF to MongoDB
const uploadPdfToDB = (filename, filepath) => {
  if (!gfs) {
    console.error('GridFSBucket is not initialized.');
    return;
  }

  const writestream = gfs.openUploadStream(filename, {
    contentType: 'application/pdf'
  });

  fs.createReadStream(filepath).pipe(writestream);
  writestream.on('finish', () => {
    console.log(`${filename} has been written to MongoDB.`);
  });
};

// Route to handle email submissions and respond with PDF URL
app.post('/submit-email', async (req, res) => {
  const { email, paper } = req.body;

  // Validate email
  if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return res.status(400).send('Invalid email address.');
  }

  try {
    // Save email to database
    const newEmail = new Email({ email });
    await newEmail.save();
    console.log('Email saved to database.');

    // Determine the file to serve
    let filename;
    switch (paper) {
      case 'Open Source Language Models':
        filename = 'AI-METHODLOGY.pdf';
        break;
      case 'Unifying Knowledge Graphs with Language Models':
        filename = 'KGs+LLMs.pdf';
        break;
      case 'Differentially-Private Offsite Prompt Tuning (DP-OPT)':
        filename = 'DP-OPT.pdf';
        break;
      default:
        return res.status(400).send('Invalid paper selection.');
    }

    // Create the full URL for the PDF
    const pdfUrl = `${req.protocol}://${req.get('host')}/download-pdf/${filename}`;
    res.json({ pdfUrl });
  } catch (err) {
    console.error('Error saving email to database:', err);
    res.status(500).send('Error saving email.');
  }
});

// Route to download PDF from MongoDB
app.get('/download-pdf/:filename', (req, res) => {
  const { filename } = req.params;

  gfs.openDownloadStreamByName(filename)
    .pipe(res)
    .on('error', (err) => {
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file.');
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
