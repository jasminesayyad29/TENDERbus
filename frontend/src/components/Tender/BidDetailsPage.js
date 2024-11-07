import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './BidDetailsPage.css';

const BidDetailsPage = () => {
  const { tenderId,email } = useParams();
  console.log("Email:", email);
  const [bidDetails, setBidDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBidDetails = async () => {
      try {
         
        const response = await axios.get(`http://localhost:5000/api/bids/email/${email}`);
        console.log(response.data);
        setBidDetails(response.data); // Set the bid data
        setError('');
      } catch (err) {
        setError('Failed to fetch bid details.');
      }
    };

    fetchBidDetails();
  }, [email]);

  if (error) return <p className="error-message">{error}</p>;

  if (!bidDetails) return <p>Loading bid details...</p>;

  return (
    <div className="bid-details-container">
      <h2>Bid Details for Tender: {tenderId}</h2>
      <h2>Bidder Email: {email}</h2> 
      <h2> Tender: {tenderId}</h2>
      <p><strong>Bidder Name:</strong> {bidDetails.bidderName}</p>
      <p><strong>Company Name:</strong> {bidDetails.companyName}</p>
      <p><strong>Company Registration Number:</strong> {bidDetails.companyRegNumber}</p>
      <p><strong>Email:</strong> {bidDetails.email}</p>
      <p><strong>Phone Number:</strong> {bidDetails.phoneNumber}</p>
      <p><strong>Bid Amount:</strong> ${bidDetails.bidAmount}</p>
      <p><strong>Bid Description:</strong> {bidDetails.description}</p>
      <p><strong>Additional Notes:</strong> {bidDetails.additionalNotes || "None"}</p>
      <p><strong>Expiry Date:</strong> {new Date(bidDetails.expiryDate).toLocaleDateString()}</p>

      {bidDetails.fileUrl && (
        <p>
          <strong>Attached File:</strong> <a href={bidDetails.fileUrl} target="_blank" rel="noopener noreferrer">Download</a>
        </p>
      )}
      <Link to={`/tender/bid-details/${email}`}>Bid details</Link>
    </div>
  );
};

export default BidDetailsPage;
