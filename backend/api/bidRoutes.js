// bidroutes.js

const express = require('express');
const router = express.Router();
const Bid = require('../models/BidModel'); // Adjust path as necessary

// POST endpoint to submit a new bid
router.post('/', async (req, res) => {
    try {
        const { tenderId, bidderName, companyName, companyRegNumber, email, phoneNumber, bidAmount, description, additionalNotes, expiryDate, filePath } = req.body;

        // Create a new bid document
        const newBid = new Bid({
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
            filePath
        });

        // Save the bid to the database
        const savedBid = await newBid.save();

        // Send back the response, including the _id (bidderId)
        res.status(201).json({
            message: 'Bid submitted successfully',
            bid: savedBid // This includes the _id which is the bidderId
        });
    } catch (err) {
        res.status(400).json({ message: 'Failed to submit bid: ' + err.message });
    }
});

module.exports = router;
