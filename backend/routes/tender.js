// ./routes/tender.js
const express = require('express');
const router = express.Router();
const TenderModel = require('../models/Tender'); // Adjust path based on your folder structure

// Middleware to parse JSON requests
router.use(express.json());

// GET all tenders
router.get('/', async (req, res) => {
    try {
        const tenders = await TenderModel.find(); // Fetch all tenders from the database
        res.json(tenders); // Send back the tenders as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tenders' });
    }
});

// GET a specific tender by ID
router.get('/:id', async (req, res) => {
    try {
        const tender = await TenderModel.findById(req.params.id); // Fetch tender by ID
        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' });
        }
        res.json(tender); // Send back the tender as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tender' });
    }
});

// POST a new tender
router.post('/', async (req, res) => {
    const { title, description, type, status, startDate, endDate } = req.body; // Extract data from the request body

    const newTender = new TenderModel({
        title,
        description,
        type,
        status,
        startDate,
        endDate
    });

    try {
        const savedTender = await newTender.save(); // Save the new tender to the database
        res.status(201).json(savedTender); // Send back the created tender as a JSON response
    } catch (error) {
        res.status(400).json({ message: 'Error creating tender', error });
    }
});

// PUT to update an existing tender
router.put('/:id', async (req, res) => {
    try {
        const updatedTender = await TenderModel.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update tender by ID
        if (!updatedTender) {
            return res.status(404).json({ message: 'Tender not found' });
        }
        res.json(updatedTender); // Send back the updated tender as a JSON response
    } catch (error) {
        res.status(400).json({ message: 'Error updating tender', error });
    }
});

// DELETE a tender
router.delete('/:id', async (req, res) => {
    try {
        const deletedTender = await TenderModel.findByIdAndDelete(req.params.id); // Delete tender by ID
        if (!deletedTender) {
            return res.status(404).json({ message: 'Tender not found' });
        }
        res.json({ message: 'Tender deleted successfully' }); // Send back a success message
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tender', error });
    }
});

module.exports = router; // Export the router
