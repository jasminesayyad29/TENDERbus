import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SubmitBidPage.css';

const SubmitBidPage = () => {
    const { tenderId } = useParams(); // Get tender ID from URL
    const [bidderName, setBidderName] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bid = { tenderId, bidderName, bidAmount: Number(bidAmount), description };
            const response = await axios.post('http://localhost:5000/api/bids', bid);
            setSuccess('Bid submitted successfully!');
            setError('');
            console.log(response.data); // Optional: Log the response for debugging
        } catch (err) {
            // Improved error handling
            const message = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : err.message;
            setError('Failed to submit bid: ' + message);
            setSuccess('');
        }
    };

    return (
        <div className="submit-bid-container">
            <h2>Submit Bid for Tender: {tenderId}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={bidderName}
                    onChange={(e) => setBidderName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Bid Amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Bid Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Submit Bid</button>
            </form>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SubmitBidPage;
