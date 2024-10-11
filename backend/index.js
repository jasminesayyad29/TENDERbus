// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/database');
const usermodel = require('./models/User'); // Import User model

// Connect to the database
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

// User Registration Route
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body; 
  usermodel.findOne({ username: username })
    .then(user => {
      if (user) {
        return res.json("User already exists");
      } else {
        // Create a new user if it does not exist
        usermodel.create(req.body)
          .then(newUser => res.json(newUser))
          .catch(err => res.status(500).json(err));
      }
    });
});

// User Login Route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body; 
  usermodel.findOne({ username: username })
    .then(user => {
      if (user) {
        if (user.password === password) {
          return res.json("Success"); // Use proper response here, e.g., token generation
        } else {
          return res.json("The password is incorrect");
        }
      } else {
        return res.json("No Record Found");
      }
    })
    .catch(err => res.status(500).json(err));
});

// Use routes (adjusted paths according to your file structure)
app.use('/api/tenders', tenderRoutes);
app.use('/api/auth', authRoutes);  // Add auth routes instead of user routes
app.use('/api/bids', bidRoutes);   // Add bid routes

// Define PORT from environment variables or default to 5000
const PORT = process.env.PORT || 3000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
