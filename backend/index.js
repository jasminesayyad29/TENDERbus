// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/database');

connectDB();

// Import routes
const tenderRoutes = require('./api/tenderRoutes'); // Adjust path to tender routes
const authRoutes = require('./api/Auth');          // Adjust path to Auth routes
const bidRoutes = require('./api/bidRoutes');      // Adjust path to bid routes

// Set up the Express app
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with the current timestamp
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer middleware for handling file uploads
const upload = multer({ storage });

// Use routes (adjusted paths according to your file structure)
app.use('/api/tenders', tenderRoutes);
app.use('/api/auth', authRoutes);  // Add auth routes instead of user routes
app.use('/api/bids', bidRoutes);   // Add bid routes


// Define PORT from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
