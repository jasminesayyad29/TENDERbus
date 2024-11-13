import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTenders } from '../../services/tenderService';
import './ViewTenderPage.css';

const ViewTenderPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTender, setSelectedTender] = useState(null); // State for selected tender
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const currentDate = new Date();
  const isInactive = (endDate) => {
    if (!endDate) return false;
    return new Date(endDate) < currentDate;
  };

  const openModal = (tender) => {
    setSelectedTender(tender);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTender(null);
    setIsModalOpen(false);
  };

  return (
    <div className="view-tender-page-container">
      <div className="view-tender-page-header-container">
        <button onClick={() => navigate(-1)} className="view-tender-page-back-button">
          ← Back
        </button>
        <h1 className="Click-On-Tender-To-Bid">Click On Tender To Bid</h1>
      </div>
      {tenders.length === 0 ? (
        <p className="view-tender-page-no-tender-message">No tenders available.</p>
      ) : (
        <div className="view-tender-page-list-container">
          {tenders.map((tender) => (
            <div
              key={tender._id}
              className="view-tender-page-card"
              onClick={() => openModal(tender)} // Open modal on click
            >
              <h2 className="view-tender-page-id">
                Tender ID: <span className="highlighted-text">{tender._id}</span>
              </h2>
              <h3 className="view-tender-page-title">{tender.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Modal for displaying tender details */}
      {isModalOpen && selectedTender && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close-button">×</button>
            <h2 className="view-tender-page-id">
              Tender ID: <span className="highlighted-text">{selectedTender._id}</span>
            </h2>
            <p className="view-tender-page-title">Created By: {selectedTender.email}</p>
            <h3 className="view-tender-page-title">{selectedTender.title}</h3>
            <p className="view-tender-page-desc">{selectedTender.description}</p>
            <p className="view-tender-page-type">Type: {selectedTender.type}</p>
            <p
              className="view-tender-page-status"
              style={{ color: isInactive(selectedTender.endDate) ? 'red' : 'green' }}
            >
              Status: {isInactive(selectedTender.endDate) ? 'Inactive' : selectedTender.status}
            </p>
            <p className="view-tender-page-dates">
              Start Date: {selectedTender.startDate ? new Date(selectedTender.startDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="view-tender-page-dates">
              End Date: {selectedTender.endDate ? new Date(selectedTender.endDate).toLocaleDateString() : 'N/A'}
            </p>
            {selectedTender.document && (
              <p className="view-tender-page-document">
                <a href={`http://localhost:5000/${selectedTender.document}`} target="_blank" rel="noopener noreferrer">
                  View Document
                </a>
              </p>
            )}
            <a href={`/tender/submit/${selectedTender._id}`} className="view-tender-page-submit-bid-link">
              Submit Bid
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTenderPage;
