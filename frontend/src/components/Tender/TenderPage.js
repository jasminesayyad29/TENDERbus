import React, { useEffect, useState } from 'react';
import { fetchTenders } from '../../services/tenderService';
import { useParams } from 'react-router-dom';
import './TenderPage.css';

const TenderPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTender, setSelectedTender] = useState(null);
  const { tenderId } = useParams();

  useEffect(() => {
    const getTenders = async () => {
      try {
        const data = await fetchTenders();
        setTenders(data);
      } catch (err) {
        setError(`Failed to fetch tenders: ${err.message || err}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getTenders();
  }, [tenderId]);

  const handleCardClick = (tender) => {
    setSelectedTender(tender);
  };

  const handleCloseModal = () => {
    setSelectedTender(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tender-page-container">
      <h1>Tenders Open Now!</h1>
      {tenders.length === 0 ? (
        <p>No tenders available.</p>
      ) : (
        <div className="tender-page-card-container">
          {tenders.map((tender) => (
            <div key={tender._id} className="tender-page-card" onClick={() => handleCardClick(tender)}>
              <h2>{tender._id}</h2>
              <h3>{tender.title}</h3>
            </div>
          ))}
        </div>
      )}
      
      {selectedTender && (
        <div className="tender-page-modal-overlay" onClick={handleCloseModal}>
          <div className="tender-page-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="tender-page-close-button" onClick={handleCloseModal}>×</button>
            <h2>Tender ID: {selectedTender._id}</h2>
            <h2>{selectedTender.title}</h2>
            <p>{selectedTender.description}</p>
            <p>Type: {selectedTender.type}</p>
            <p>Status: {selectedTender.status}</p>
            <p>Start Date: {selectedTender.startDate ? new Date(selectedTender.startDate).toLocaleDateString() : 'N/A'}</p>
            <p>End Date: {selectedTender.endDate ? new Date(selectedTender.endDate).toLocaleDateString() : 'N/A'}</p>
            {selectedTender.document && (
              <p>
                <a href={`http://localhost:5000/${selectedTender.document}`} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderPage;
