const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  tenderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tender',  // Assuming there's a Tender model
    required: true
  },
  bidderName: String,
  bidAmount: Number,
  description: String,
  submissionDate: {
    type: Date,
    default: Date.now
  }
});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;
