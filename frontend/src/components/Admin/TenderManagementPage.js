import React, { useEffect, useState } from 'react';
import { fetchTendersbymail } from '../../services/tenderService';
import './TenderManagementPage.css';
import { useNavigate } from 'react-router-dom';

const TenderManagementPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        <tbody className='table-body'>
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
    </div>
  );
};

export default TenderManagementPage;
