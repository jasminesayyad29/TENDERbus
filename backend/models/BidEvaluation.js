const mongoose = require('mongoose');

const bidEvaluationSchema = new mongoose.Schema({
    bidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid', required: true },
    ratings: {
        price: { type: Number, min: 1, max: 10 },
        quality: { type: Number, min: 1, max: 10 },
        deliveryTime: { type: Number, min: 1, max: 10 }
    },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BidEvaluation', bidEvaluationSchema);
