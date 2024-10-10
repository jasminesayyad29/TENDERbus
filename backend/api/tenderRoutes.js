const express = require('express');
const Tender = require('../models/Tender');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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
    const { title, description, type, status, startDate, endDate } = req.body;
    const document = req.file ? req.file.path : ''; // Get the file path

    const newTender = new Tender({
      title,
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
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const deletedTender = await Tender.findByIdAndDelete(id); // Delete the tender

    if (!deletedTender) {
      return res.status(404).json({ message: 'Tender not found' }); // Handle case where tender does not exist
    }

    res.status(200).json({ message: 'Tender deleted successfully' }); // Respond with success message
  } catch (error) {
    console.error('Error deleting tender:', error);
    res.status(500).json({ message: 'Error deleting tender', error });
  }
});

module.exports = router; // Export the router
