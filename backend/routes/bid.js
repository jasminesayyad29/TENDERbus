// routes/bid.js
const express = require('express');
const multer = require('multer');
const Bid = require('../models/Bid'); // Adjust path based on your folder structure

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure 'uploads/' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage });

// POST route to submit a bid
router.post('/bids', upload.single('file'), async (req, res) => {
    try {
        // Extract fields from the request body
        const { tenderId, bidderName, companyName, companyRegNumber, email, phoneNumber, bidAmount, description, additionalNotes, expiryDate } = req.body;

        // Validate required fields
        if (!tenderId) {
            return res.status(400).json({ message: 'Tender ID is required' });
        }
        if (!bidderName || !companyName || !email || !phoneNumber || !bidAmount || !description) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create a new bid instance
        const bid = new Bid({
            tenderId, // Ensure tenderId is a valid ObjectId
            bidderName,
            companyName,
            companyRegNumber,
            email,
            phoneNumber,
            bidAmount,
            description,
            additionalNotes,
            expiryDate,
            filePath: req.file ? req.file.path : null // Store the file path if uploaded
        });

        // Save the bid to the database
        await bid.save();
        res.status(201).json({ message: 'Bid submitted successfully', bid });

    } catch (error) {
        console.error('Error submitting bid:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).json({ message: 'Failed to submit bid', error: error.message });
    }
});

module.exports = router;
