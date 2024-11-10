import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchTenders } from '../../services/tenderService';
import { useParams } from 'react-router-dom';
import './ViewTenderPage.css';

const ViewTenderPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tenderId } = useParams();
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const getTenders = async () => {
      try {
        const data = await fetchTenders();
        setTenders(data); // Update state with fetched tenders
      } catch (err) {
        setError(`Failed to fetch tenders: ${err.message || err}`);
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false); // Ensure loading is set to false in any case
      }
    };

    getTenders(); // Fetch tenders on component load
  }, [tenderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const currentDate = new Date(); // Get current date

  // Function to check if tender is inactive based on endDate
  const isInactive = (endDate) => {
    if (!endDate) return false; // If no end date, don't mark as inactive
    const tenderEndDate = new Date(endDate); // Convert ISO string to Date object
    return tenderEndDate < currentDate; // If the tender end date is before today
  };

  return (
    <div className="view-tender-page-container">
      <div className="view-tender-page-header-container">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="view-tender-page-back-button">
          ← Back
        </button>
        <h1 className="view-tender-page-header">Select Tender To Bid</h1>
      </div>
      {tenders.length === 0 ? (
        <p className="view-tender-page-no-tender-message">No tenders available.</p>
      ) : (
        <div className="view-tender-page-list-container">
          {tenders.map((tender) => {
            const endDate = tender.endDate;
            const inactiveStatus = isInactive(endDate);

            return (
              <div key={tender._id} className="view-tender-page-card">
                <h2 className="view-tender-page-id">Tender ID: {tender._id}</h2>
                <h3 className="view-tender-page-title">{tender.title}</h3>
                <p className="view-tender-page-desc">{tender.description}</p>
                <p className="view-tender-page-type">Type: {tender.type}</p>
                <p
                  className="view-tender-page-status"
                  style={{ color: inactiveStatus ? 'red' : 'green' }}
                >
                  Status: {inactiveStatus ? 'Inactive' : tender.status}
                </p>
                <p className="view-tender-page-dates">
                  Start Date: {tender.startDate ? new Date(tender.startDate).toLocaleDateString() : 'N/A'}
                </p>
                <p className="view-tender-page-dates">
                  End Date: {endDate ? new Date(endDate).toLocaleDateString() : 'N/A'}
                </p>
                {tender.document && (
                  <p className="view-tender-page-document">
                    <a href={`http://localhost:5000/${tender.document}`} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  </p>
                )}
                <Link to={`/tender/submit/${tender._id}`} className="view-tender-page-submit-bid-link">
                  Submit Bid 
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewTenderPage;
