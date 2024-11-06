
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTenders } from '../../services/tenderService';
import './TenderManagementPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TenderManagementPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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


  const handleDelete = async (tenderId) => {
    navigate(`/tender/delete/${tenderId}`);
    console.log('Edit tender:', tenderId);
    // try {
    //   await axios.delete(`http://localhost:5000/api/tenders/${id}`);
    //   setTenders(tenders.filter(tender => tender._id !== id));
    //   alert('Tender deleted successfully');
    // } catch (error) {
    //   console.error('Error deleting tender:', error);
    //   alert('Error deleting tender');
    // }
  };

  const handleEdit = (tenderId) => {
    // Redirect to an edit page or open a modal with form pre-filled with tender data
    navigate(`/tender/modify/${tenderId}`);
    console.log('Edit tender:', tenderId);
  };

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
