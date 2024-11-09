
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
        const bid = await Bid.find({ _id: bidderId });
        if (!bid) {
          return res.status(404).json({ message: 'Bid not found' });
        }
        res.status(200).json(bid);
      } catch (error) {
        console.error('Error fetching bid:', error);
        res.status(500).json({ message: 'Failed to fetch bid', error: error.message });
    }
});

router.get('/bids', async (req, res) => {
    try {
        const bid = await Bid.find();
        res.status(200).json(bid);
      } catch (error) {
        console.error('Error fetching bid:', error);
        res.status(500).json({ message: 'Failed to fetch bid', error: error.message });
    }
});
// 2. GET route to fetch all bids (admin evaluation dashboard)
// 3. PUT route to update bid ratings and comments (admin evaluation)
router.put('/bids/:id/evaluate', async (req, res) => {
    const { id } = req.params;
    const { ratings, comment } = req.body;

    if (ratings) {
        for (let criterion in ratings) {
            if (ratings[criterion] < 1 || ratings[criterion] > 10) {
                return res.status(400).json({
                    message: `Invalid rating for ${criterion}. It should be between 1 and 10.`
                });
            }
        }
    }

    try {
        const bid = await Bid.findById(id);
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        // Create or update evaluation data
        let evaluation = await BidEvaluation.findOne({ bidId: id });

        if (!evaluation) {
            evaluation = new BidEvaluation({
                bidId: id,
                ratings: ratings || {},
                comment: comment || '',
            });
        } else {
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

// 2. GET route to fetch a bid by ObjectId (for admin evaluation dashboard)
router.get('/bids/id/:bidderId', async (req, res) => {
    const bidderId = req.params.bidderId.trim();
    try {
        const bid = await Bid.findById(bidderId); // Find by _id
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        res.status(200).json(bid);
    } catch (error) {
        console.error('Error fetching bid:', error);
        res.status(500).json({ message: 'Failed to fetch bid', error: error.message });
    }
});

// 2b. GET route to fetch bids by email (for specific user bids)
router.get('/bids/email/:email', async (req, res) => {
    try {
        const email = req.params.email.trim();
        const bids = await Bid.find({ email: email }); // Find by email field
        if (!bids || bids.length === 0) {
            return res.status(404).json({ message: 'No bids found for this email' });
        }
        res.status(200).json(bids);
    } catch (error) {
        console.error('Error fetching bids by email:', error);
        res.status(500).json({ message: 'Error fetching bids', error });
    }
});
router.put('/bids/:id', async (req, res) => {
    try {
        const { ratings, comments } = req.body;
        const updatedBid = await Bid.findByIdAndUpdate(
            req.params.id,
            { $set: { ratings, comments } },
            { new: true }
        );

        if (!updatedBid) {
            return res.status(404).send('Bid not found');
        }

        res.status(200).json(updatedBid);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update bid');
    }
});

  

module.exports = router;
