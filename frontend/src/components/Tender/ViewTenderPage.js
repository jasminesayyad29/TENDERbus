

// export default ViewTenderPage;
// src/components/Tender/ViewTenderPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {fetchTenders} from '../../services/tenderService';
import { useParams } from 'react-router-dom';
import './ViewTenderPage.css';

const ViewTenderPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tenderId } = useParams();


  useEffect(() => {
    const getTenders = async () => {
      try {
        const data = await fetchTenders();
        setTenders(data); // Update state with fetched tenders
      } catch (err) {
        // Set a more informative error message
        setError(`Failed to fetch tenders: ${err.message || err}`);
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false); // Ensure loading is set to false in any case
      }
    };

    getTenders(); // Fetch tenders on component load
  }, [tenderId]);

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>{error}</p>; // Display error message

  return (
    <div className="view-tender-container">
      <h1>Tenders Open Now!</h1>
      {tenders.length === 0 ? (
        <p>No tenders available.</p>
      ) : (
        <div className="tender-card-container">
          {tenders.map((tender) => (
            <div key={tender._id} className="tender-card">
              <h2>Tender ID: {tender._id}</h2>
              <h2>{tender.title}</h2>
              <p>{tender.description}</p>
              <p className="type">Type: {tender.type}</p>
              <p className="status">Status: {tender.status}</p>
              <p>Start Date: {tender.startDate ? new Date(tender.startDate).toLocaleDateString() : 'N/A'}</p>
              <p>End Date: {tender.endDate ? new Date(tender.endDate).toLocaleDateString() : 'N/A'}</p>
              <Link to={`/tender/submit/${tender._id}`} className="submit-link">
                Do you want to submit the bid?
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default ViewTenderPage;

