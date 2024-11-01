// import React from 'react';
// import './TenderManagementPage.css';

// const TenderManagementPage = () => {
//   return (
//     <div className="tender-management-container">
//       <h2>Tender Management</h2>
//       <p>Manage all active and archived tenders here.</p>
//     </div>
//   );
// };

// export default TenderManagementPage;

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
    <div>
      <h1>Manage Tenders</h1>
      {tenders.length === 0 ? ( // Check if there are no tenders
        <p>No tenders available.</p>
      ) : (
        <ul>
          {tenders.map((tender) => (
            <li key={tender._id}>
              <Link to={`/view-tender/${tender._id}`}>{tender.title}</Link>
              <h2>{tender.title}</h2>
              <p>Tender ID: {tender._id}</p>
              <p>{tender.description}</p>
              <p>Type: {tender.type}</p>
              <p>Status: {tender.status}</p>
              <p>Start Date: {new Date(tender.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(tender.endDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TenderManagementPage;
