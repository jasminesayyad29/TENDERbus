import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BidDetailsPage.css';

const BidDetailsPage = () => {
  const { tenderId,bidderID } = useParams();
  console.log("BidderId:", bidderID);
  const [bidDetails, setBidDetails] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBidDetails = async () => {
      try {
         
        const response = await axios.get(`http://localhost:5000/api/bids`);
        console.log(response.data);
        setBidDetails(response.data); // Set the bid data
       
        setError('');
      } catch (err) {
        setError('Failed to fetch bid details.');
      }
    };

    fetchBidDetails();
  }, []);

  if (error) return <p className="error-message">{error}</p>;

  if (!bidDetails) return <p>Loading bid details...</p>;

  return (
    <div className="bid-details-container">
      {bidDetails.map((bid) => (
        <div key={bid._id} className="bid-details">
          <h2>Bid Details for Tender: {bid.tenderId}</h2>
          <h2>Bid ID: {bid._id}</h2> 
          <h2>Tender: {bid.tenderId}</h2>
          <p><strong>Bidder Name:</strong> {bid.bidderName}</p>
          <p><strong>Company Name:</strong> {bid.companyName}</p>
          <p><strong>Company Registration Number:</strong> {bid.companyRegNumber}</p>
          <p><strong>Email:</strong> {bid.email}</p>
          <p><strong>Phone Number:</strong> {bid.phoneNumber}</p>
          <p><strong>Bid Amount:</strong> ${bid.bidAmount}</p>
          <p><strong>Bid Description:</strong> {bid.description}</p>
          <p><strong>Additional Notes:</strong> {bid.additionalNotes || "None"}</p>
          <p><strong>Expiry Date:</strong> {new Date(bid.expiryDate).toLocaleDateString()}</p>
  
          {bid.filePath && (
            <p>
              <strong>Attached File:</strong>{" "}
              <a href={`http://localhost:5000/${bid.filePath}`} target="_blank" rel="noopener noreferrer">Download</a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
} 
export default BidDetailsPage;
