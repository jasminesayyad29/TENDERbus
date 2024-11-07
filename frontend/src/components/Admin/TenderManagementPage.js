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
    // Retrieve email from user object in localStorage and log it
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const email = storedUser?.email;
    console.log("Email from localStorage:", email);

    if (!email) {
      setError("User email not found in localStorage.");
      setLoading(false);
      return;
    }

    // Fetch tenders based on email
    const getTenders = async () => {
      try {
        const data = await fetchTendersbymail(email);
        setTenders(data);
      } catch (err) {
        setError(`Failed to fetch tenders: ${err.message || err}`);
        console.error("Error fetching tenders:", err);
      } finally {
        setLoading(false);
      }
    };

    getTenders();
  }, []);

  const handleDelete = async (tenderId) => {
    navigate(`/tender/delete/${tenderId}`);
  };

  const handleEdit = (tenderId) => {
    navigate(`/tender/modify/${tenderId}`);
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
                <td>{new Date(tender.startDate).toLocaleDateString()}</td>
                <td>{new Date(tender.endDate).toLocaleDateString()}</td>
                <td>{tender.status}</td>
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
