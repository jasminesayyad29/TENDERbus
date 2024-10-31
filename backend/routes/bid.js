// routes/bidRoutes.js
const express = require('express');
const multer = require('multer');
const Bid = require('../models/Bid'); // Adjust path based on your folder structure

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure 'uploads/' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/bids', upload.single('file'), async (req, res) => {
    try {
        const { tenderId, bidderName, companyName, companyRegNumber, email, phoneNumber, bidAmount, description, additionalNotes, expiryDate } = req.body;
        const bid = new Bid({
            tenderId,
            bidderName,
            companyName,
            companyRegNumber,
            email,
            phoneNumber,
            bidAmount,
            description,
            additionalNotes,
            expiryDate,
            file: req.file ? req.file.path : null
        });

        await bid.save();
        res.status(201).json({ message: 'Bid submitted successfully', bid });
    } catch (error) {
        console.error('Error submitting bid:', error);
        res.status(500).json({ message: 'Failed to submit bid' });
    }
});

module.exports = router;
