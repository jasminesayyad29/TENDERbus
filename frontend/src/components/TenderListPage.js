// src/components/TenderListPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TenderListPage.css';

const TenderListPage = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tendersPerPage] = useState(5); // Change as necessary

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tenders');
        setTenders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tenders.');
        setLoading(false);
      }
    };
    fetchTenders();
  }, []);

  // Filtered tenders based on search term
  const filteredTenders = tenders.filter(tender =>
    tender.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current tenders for pagination
  const indexOfLastTender = currentPage * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = filteredTenders.slice(indexOfFirstTender, indexOfLastTender);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tender-list">
      <h2>Tender List</h2>
      <input
        type="text"
        placeholder="Search Tenders"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTenders.map(tender => (
            <tr key={tender._id}>
              <td>{tender.title}</td>
              <td>{tender.description}</td>
              <td>{tender.status}</td>
              <td>
                <button onClick={() => console.log('Edit Tender', tender._id)}>Edit</button>
                <button onClick={() => console.log('Delete Tender', tender._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        tendersPerPage={tendersPerPage}
        totalTenders={filteredTenders.length}
        paginate={paginate}
      />
    </div>
  );
};

// Pagination Component
const Pagination = ({ tendersPerPage, totalTenders, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTenders / tendersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TenderListPage;
