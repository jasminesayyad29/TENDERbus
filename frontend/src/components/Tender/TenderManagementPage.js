import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TenderManagementPage.css'; // Optional, for styling

const TenderManagementPage = () => {
  const [tenders, setTenders] = useState([]);

  // Fetch tenders from the API
  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tenders'); // API call to fetch tenders
        setTenders(response.data); // Store the tenders in state
      } catch (error) {
        console.error('Error fetching tenders:', error);
      }
    };

    fetchTenders();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tenders/${id}`);
      setTenders(tenders.filter(tender => tender._id !== id));
      alert('Tender deleted successfully');
    } catch (error) {
      console.error('Error deleting tender:', error);
      alert('Error deleting tender');
    }
  };

  const handleEdit = (tender) => {
    // Redirect to an edit page or open a modal with form pre-filled with tender data
    console.log('Edit tender:', tender);
  };

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
                <td>
                  <button onClick={() => handleEdit(tender)}>Edit</button>
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
