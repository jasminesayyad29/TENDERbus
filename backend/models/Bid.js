const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    tenderId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tender', 
        required: true 
    },
    bidderName:{ 
        type: String, 
        required: true 
    },
    companyName: { 
        type: String, 
        required: true 
    },
    companyRegNumber: {
        type: String 
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
        type: String 
    },
    expiryDate: { 
        type: Date 
    },
    filePath: { 
        type: String 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', bidSchema);
