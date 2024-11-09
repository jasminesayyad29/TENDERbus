import React, { useEffect, useState } from 'react';
import { fetchTendersbymail, fetchBidsByTenderId } from '../../services/tenderService';
import { useNavigate } from 'react-router-dom';
import './TenderManagementPage.css';

const TenderManagementPage = () => {
  const [tenders, setTenders] = useState([]);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidError, setBidError] = useState(null);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isBidDetailsModalOpen, setIsBidDetailsModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [selectedTenderId, setSelectedTenderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const email = storedUser?.email;

    if (!email) {
      setError("User email not found in localStorage.");
      setLoading(false);
      return;
    }

    const getTenders = async () => {
      try {
        const data = await fetchTendersbymail(email);
        const updatedTenders = data.map(tender => {
          const endDate = new Date(tender.endDate);
          const currentDate = new Date();

          if (endDate < currentDate && tender.status !== "Inactive") {
            return { ...tender, status: "Inactive" };
          }
          return tender;
        });

        setTenders(updatedTenders);
      } catch (err) {
        setError(`Failed to fetch tenders: ${err.message || err}`);
      } finally {
        setLoading(false);
      }
    };

    getTenders();
  }, []);

  const handleBids = async (tenderId) => {
    setSelectedTenderId(tenderId);
    try {
      const fetchedBids = await fetchBidsByTenderId(tenderId);
      setBids(fetchedBids);
      setBidError(null);
    } catch (error) {
      console.error("Error fetching bids:", error);
      setBidError("Oops..");
    } finally {
      setIsBidModalOpen(true); // Open the bid modal regardless of whether there are bids
    }
  };

  const handleBidDetails = (bid) => {
    setSelectedBid(bid);
    setIsBidDetailsModalOpen(true);
  };

  const handleCloseBidModal = () => {
    setIsBidModalOpen(false);
    setSelectedTenderId(null);
    setBids([]);
  };

  const handleCloseBidDetailsModal = () => {
    setIsBidDetailsModalOpen(false);
    setSelectedBid(null);
  };

  const handleDelete = async () => {
    navigate(`/tender/delete`);
  };

  const handleEdit = (tenderId) => {
    navigate(`/tender/modify`);
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toLocaleDateString();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tender-management-container">
      <h2>Manage Your Tenders</h2>
      <table className="tender-table">
      <thead>
  <tr>
    <th>Sr. No.</th> {/* Add this header for serial number */}
    <th>Tender ID</th>
    <th>Title</th>
    <th>Description</th>
    <th>Start Date</th>
    <th>End Date</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>

<tbody className="table-body">
  {tenders.length > 0 ? (
    tenders.map((tender, index) => (
      <tr key={tender._id}>
        <td>{index + 1}</td> {/* Serial number */}
        <td>{tender._id}</td>
        <td>{tender.title}</td>
        <td>{tender.description}</td>
        <td>{formatDate(tender.startDate)}</td>
        <td>{formatDate(tender.endDate)}</td>
        <td className={tender.status === "Inactive" ? "inactive-status" : ""}>
          {tender.status}
        </td>
        <td>
          <button onClick={() => handleBids(tender._id)}>View Bids</button>
          <button onClick={() => handleEdit(tender._id)}>Edit</button>
          <button onClick={() => handleDelete(tender._id)}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="8">No tenders available</td>
    </tr>
  )}
</tbody>

      </table>

      {/* Bids List Modal */}
      {isBidModalOpen && (
        <div className="modal-overlay-tender-management">
          <div className="modal-container-tender-management">
            <h3>Bids for Selected Tender</h3>
            <button className="close-btn-tender-management" onClick={handleCloseBidModal}>X</button>
            {bidError && <p>{bidError}</p>}
            {bids.length > 0 ? (
              <ul>
                {bids.map((bid, index) => (
                  <li key={index} className="bid-item-tender-management">
                    <span className="bidder-name-tender-management"><strong>Bidder:</strong> {bid.bidderName}</span>
                    <button onClick={() => handleBidDetails(bid)}>View Bid Details</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Bids For This Tender</p> // Show this message if there are no bids
            )}
          </div>
        </div>
      )}
{/* Bid Details Modal */}
{isBidDetailsModalOpen && selectedBid && (
  <div className="modal-overlay-tender-management">
    <div className="modal-container-tender-management">
      <h3>Bid Details</h3>
      <button className="close-btn-tender-management" onClick={handleCloseBidDetailsModal}>X</button>
      <div className="bid-details-tender-management">
        <p><strong>Bid ID:</strong> {selectedBid._id}</p> {/* Add Bid ID here */}
        <p><strong>Bidder Name:</strong> {selectedBid.bidderName}</p>
        <p><strong>Company Name:</strong> {selectedBid.companyName}</p>
        <p><strong>Company Reg Number:</strong> {selectedBid.companyRegNumber}</p>
        <p><strong>Email:</strong> {selectedBid.email}</p>
        <p><strong>Phone Number:</strong> {selectedBid.phoneNumber}</p>
        <p><strong>Bid Amount:</strong> ₹{selectedBid.bidAmount}</p>
        <p><strong>Description:</strong> {selectedBid.description}</p>
        <p><strong>Additional Notes:</strong> {selectedBid.additionalNotes}</p>
        <p><strong>Expiry Date:</strong> {new Date(selectedBid.expiryDate).toLocaleDateString()}</p>
        
        {/* Add Download Button */}
        {selectedBid.filePath && (
          <a 
            href={selectedBid.filePath} 
            download
            className="download-btn-tender-management"
          >
            Download File
          </a>
        )}
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default TenderManagementPage;
