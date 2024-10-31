const express = require('express');
const router = express.Router();
const Bid = require('../models/BidModel'); // Adjust path as necessary

// In-memory bids array (use a database in production)
let bids = [];

// POST endpoint to submit a new bid
router.post('/', (req, res) => {
    const { tenderId, bidderName, bidAmount, description } = req.body;

    // Check for required fields
    if (!tenderId || !bidderName || !bidAmount || !description) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new bid object
    const newBid = {
        _id: Date.now(), // Generate a unique ID (use a better ID generator in production)
        tenderId,
        bidderName,
        bidAmount: parseFloat(bidAmount), // Ensure amount is a float
        description,
        submissionDate: new Date(),
    };

    // Store the new bid (replace this with your database logic)
    bids.push(newBid);
    console.log('New Bid Submitted:', newBid); // For debugging purposes

    // Send back the newly created bid
    res.status(201).json(newBid);
});

// GET endpoint to retrieve all bids
router.get('/', (req, res) => {
    res.json(bids); // Send the list of bids
});

module.exports = router;
