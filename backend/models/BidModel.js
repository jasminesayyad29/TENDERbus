const mongoose = require('mongoose');

// Define the schema for the Bid
const bidSchema = new mongoose.Schema({
    tenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tender', // Assumes there is a Tender model defined elsewhere
        required: true
    },
    bidderName: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyRegNumber: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    additionalNotes: {
        type: String,
    },
    expiryDate: {
        type: Date,
    },
    filePath: {
        type: String, // This will store the file path if a file is uploaded
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Bid model based on the schema
module.exports = mongoose.model('Bid', bidSchema);
