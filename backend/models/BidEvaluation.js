const mongoose = require('mongoose');

const bidEvaluationSchema = new mongoose.Schema({
    bidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid', required: true },  // Reference to the Bid document
    ratings: {
        bidAmount: { type: Number, min: 1, max: 10, required: true },  // Rating for bid amount
        timeliness: { type: Number, min: 1, max: 10, required: true },  // Rating for timeliness
        quality: { type: Number, min: 1, max: 10, required: true },     // Rating for quality
        reliability: { type: Number, min: 1, max: 10, required: true }  // Rating for reliability
    },
    comment: { type: String, default: '' },  // Optional comment field
    createdAt: { type: Date, default: Date.now },  // Date when evaluation is created
    updatedAt: { type: Date, default: Date.now }  // Date when evaluation is last updated
});

// Automatically update `updatedAt` when the evaluation is modified
bidEvaluationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('BidEvaluation', bidEvaluationSchema);
