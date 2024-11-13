import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDashboardRedirect = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'Bidder') {
      navigate('/bidder/dashboard');
    } else if (user && user.role === 'Tender Officer') {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="landing-container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />   
      <br />   
   
   
      <br />
      <h1> The
        <pre>Smart Tender Management System</pre>
      </h1>
      <p>Manage and submit your tenders with ease.</p>

      {isLoggedIn ? (
        <button onClick={handleDashboardRedirect} className="dashboard-button">
          Go to Dashboard
        </button>
      ) : (
        <li className="custom-dropdown">
          <button className="custom-dropbtn"><Link to="/login" className="custom-dropbtn">Login</Link>
         </button>
          
        </li>
      )}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default LandingPage;
