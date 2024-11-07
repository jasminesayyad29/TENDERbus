
const express = require('express');
const multer = require('multer');
const Bid = require('../models/Bid');
const BidEvaluation = require('../models/BidEvaluation'); // Import the new BidEvaluation model

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 'uploads/' directory must exist
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage });

// 1. POST route to submit a bid (bidder submission)
router.post('/bids', upload.single('file'), async (req, res) => {
    try {
        const {
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
        } = req.body;

        if (!tenderId || !bidderName || !companyName || !email || !phoneNumber || !bidAmount || !description) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

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
            filePath: req.file ? req.file.path : null,
        });

        await bid.save();
        res.status(201).json({ message: 'Bid submitted successfully', bid });

    } catch (error) {
        console.error('Error submitting bid:', error);
        res.status(500).json({ message: 'Failed to submit bid', error: error.message });
    }
});

// 2. GET route to fetch all bids (admin evaluation dashboard)
router.get('/bids/:bidderId', async (req, res) => {
    let bidderId  = req.params.bidderId; 
    bidderId = bidderId.trim();
    try {
        const bid = await Bid.findOne({ _id: bidderId });
        if (!bid) {
          return res.status(404).json({ message: 'Bid not found' });
        }
        res.status(200).json(bid);
      } catch (error) {
        console.error('Error fetching bid:', error);
        res.status(500).json({ message: 'Failed to fetch bid', error: error.message });
    }
});



// 3. PUT route to update bid ratings and comments (admin evaluation)
router.put('/bids/:id/evaluate', async (req, res) => {
    const { id } = req.params;
    const { ratings, comment } = req.body;

    try {
        const bid = await Bid.findById(id);
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        // Create or update evaluation data
        let evaluation = await BidEvaluation.findOne({ bidId: id });

        if (!evaluation) {
            // If evaluation doesn't exist, create a new one
            evaluation = new BidEvaluation({
                bidId: id,
                ratings: ratings || {},
                comment: comment || '',
            });
        } else {
            // Update the existing evaluation
            evaluation.ratings = ratings || evaluation.ratings;
            evaluation.comment = comment || evaluation.comment;
        }

        await evaluation.save();
        res.status(200).json({ message: 'Bid evaluation saved successfully', evaluation });
    } catch (error) {
        console.error('Error saving evaluation:', error);
        res.status(500).json({ message: 'Failed to save evaluation', error: error.message });
    }
});

// 4. GET route to fetch evaluations for all bids (admin can view evaluations)
router.get('/bids/evaluations', async (req, res) => {
    try {
        const evaluations = await BidEvaluation.find().populate('bidId'); // Populate bid details
        res.status(200).json(evaluations);
    } catch (error) {
        console.error('Error fetching evaluations:', error);
        res.status(500).json({ message: 'Failed to fetch evaluations', error: error.message });
    }
});

module.exports = router;
