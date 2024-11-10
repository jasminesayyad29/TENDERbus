const express = require('express');
const Tender = require('../models/Tender');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {login , signup} = require("../controllers/Auth") ;
const jwt= require("jsonwebtoken") ;

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Create a new tender
router.post('/', upload.single('document'), async (req, res) => {
  try {
    const { email, title, eligibility, description, type, status, startDate, endDate } = req.body;
    const document = req.file ? req.file.path : ''; // Get the file path

    const newTender = new Tender({
      email,
      title,
      eligibility, 
      description,
      type,
      status,
      startDate,
      endDate,
      document, // Save the document path
    });

    await newTender.save();
    res.status(201).json(newTender); // Respond with the newly created tender
  } catch (error) {
    console.error('Error creating tender:', error);
    res.status(500).json({ message: 'Error creating tender', error });
  }
});

// Fetch all tenders
router.get('/', async (req, res) => {
  try {
    const tenders = await Tender.find(); // Fetch all tenders
    res.status(200).json(tenders); // Respond with the list of tenders
  } catch (error) {
    console.error('Error fetching tenders:', error);
    res.status(500).json({ message: 'Error fetching tenders', error });
  }
});

// Delete a tender by ID
const {auth , isBidder, isAdmin} = require("../middlewares/auth") ;

router.delete('/', async (req, res) => {
  try {
    const { id } = req.body; // Get the ID from the request body

    // Find and delete the tender by ID
    const tender = await Tender.findByIdAndDelete(id);

    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }

    res.status(200).json({ message: 'Tender deleted successfully' }); // Respond with success message
  } catch (error) {
    console.error('Error while deleting tender:', error);
    res.status(500).json({ message: 'Error deleting tender', error });
  }
});


// Fetch tenders by email
router.get('/:email', async (req, res) => {
  try {
      const { email } = req.params; // Extract email from request parameters
      const tenders = await Tender.find({ email }); // Use find to search by email
      if (!tenders || tenders.length === 0) {
          return res.status(404).json({ message: 'No tenders found for this email' });
      }
      res.json(tenders); // Respond with the list of tenders
  } catch (error) {
      console.error('Error fetching tenders by email:', error);
      res.status(500).json({ message: 'Error fetching tenders', error });
  }
});

//To modify tender based on tenderId

router.put('/:id', upload.single('document'), async (req, res) => {
  try {
    const tenderId = req.params.id;  // Extract tender ID from the URL
    const { email, title, eligibility, description, type, status, startDate, endDate } = req.body;
    const document = req.file ? req.file.path : '';  // Get the new document path, if provided

    // Find the existing tender by ID
    const updatedTender = await Tender.findByIdAndUpdate(
      tenderId, // ID of the tender to update
      {
        email,
        title,
        eligibility,
        description,
        type,
        status,
        startDate,
        endDate,
        document, // Update document if a new file is uploaded
      },
      { new: true } // Option to return the updated tender document
    );

    if (!updatedTender) {
      return res.status(404).json({ message: 'Tender not found' });
    }

    res.status(200).json(updatedTender); // Respond with the updated tender
  } catch (error) {
    console.error('Error updating tender:', error);
    res.status(500).json({ message: 'Error updating tender', error });
  }
});



module.exports = router; // Export the router
