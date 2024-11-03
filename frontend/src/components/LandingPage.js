import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1>Welcome to the <br/>
        <pre>Smart Tender Management System</pre></h1>
      <p>Manage and submit your tenders with ease.</p>
      <li className="custom-dropdown">
  <button className="custom-dropbtn">Register / Sign-In</button>
  <div className="custom-dropdown-content">
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
  </div>
</li>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default LandingPage;