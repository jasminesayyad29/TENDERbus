import React, { useEffect, useState } from 'react';
import { fetchTendersbymail, fetchBidsByTenderId } from '../../services/tenderService';
import './TenderManagementPage.css';
import { useNavigate } from 'react-router-dom';

const TenderManagementPage = () => {
  const [tenders, setTenders] = useState([]);
  const [bids, setBids] = useState([]); // State to store bids
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidError, setBidError] = useState(null); // State to handle bid fetching errors
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
        // Check endDate and set status to Inactive if it has passed
        const updatedTenders = data.map(tender => {
          const endDate = new Date(tender.endDate);
          const currentDate = new Date();

          if (endDate < currentDate && tender.status !== "Inactive") {
            return { ...tender, status: "Inactive" }; // Temporarily set to Inactive if expired
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
    try {
      const fetchedBids = await fetchBidsByTenderId(tenderId); // Fetch bids based on tenderId
      setBids(fetchedBids);
      setBidError(null); // Clear previous bid error if any
    } catch (error) {
      console.error("Error fetching bids:", error);
      setBidError("Failed to fetch bids for this tender.");
    }
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
      <h2>Manage Tenders</h2>
      <table className="tender-table">
        <thead>
          <tr>
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
            tenders.map((tender) => (
              <tr key={tender._id}>
                <td>{tender._id}</td>
                <td>{tender.title}</td>
                <td>{tender.description}</td>
                <td>{formatDate(tender.startDate)}</td>
                <td>{formatDate(tender.endDate)}</td>
                <td style={{ color: tender.status === "Inactive" ? "red" : "white" }}>
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
              <td colSpan="7">No tenders available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Display fetched bids */}
      <div className="bids-section">
        <h3>Bids for Selected Tender</h3>
        {bidError && <p>{bidError}</p>}
        {bids.length > 0 ? (
          <ul>
            {bids.map((bid, index) => (
              <li key={index}>
                <p><strong>Bidder Name:</strong> {bid.bidderName}</p>
                <p><strong>Company Name:</strong> {bid.companyName}</p>
                <p><strong>Company Reg Number:</strong> {bid.companyRegNumber}</p>
                <p><strong>Email:</strong> {bid.email}</p>
                <p><strong>Phone Number:</strong> {bid.phoneNumber}</p>
                <p><strong>Bid Amount:</strong> ₹{bid.bidAmount}</p>
                <p><strong>Description:</strong> {bid.description}</p>
                <p><strong>Additional Notes:</strong> {bid.additionalNotes}</p>
                <p><strong>Expiry Date:</strong> {new Date(bid.expiryDate).toLocaleDateString()}</p>
                {bid.filePath && <p><strong>File Path:</strong> {bid.filePath}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bids to display</p>
        )}
      </div>
    </div>
  );
};

export default TenderManagementPage;
