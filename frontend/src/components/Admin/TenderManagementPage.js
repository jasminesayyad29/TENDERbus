
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTenders } from '../../services/tenderService';
import './TenderManagementPage.css';

const TenderManagementPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>{error}</p>; // Display error message

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
        <tbody>
          {tenders.length > 0 ? (
            tenders.map((tender) => (
              <tr key={tender._id}>
                <td>{tender._id}</td>
                <td>{tender.title}</td>
                <td>{tender.description}</td>
                <td>{new Date(tender.startDate).toLocaleDateString()}</td>
                <td>{new Date(tender.endDate).toLocaleDateString()}</td>
                <td>{tender.status}</td>
                {/* <td>
                  <button onClick={() => handleEdit(tender)}>Edit</button>
                  <button onClick={() => handleDelete(tender._id)}>Delete</button>
                </td> */}
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
