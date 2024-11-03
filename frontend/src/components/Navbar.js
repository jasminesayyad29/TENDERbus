// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="tender">
        <a href="/" className="link">TENDERbus</a>
      </div>
      <ul className="nav-links">
        {/* Dropdown for Account (Register/Login) */}
        {/* <li className="dropdown">
          <button className="dropbtn">Register / Sign-In</button>
          <div className="dropdown-content">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </li> */}

        {/* Dropdown for Dashboards (if needed) */}
        {/* <li className="dropdown">
          <button className="dropbtn">Dashboards</button>
          <div className="dropdown-content">
            <Link to="/admin/dashboard">Tender Admin</Link>
            <Link to="/bidder/dashboard">Bidder</Link>
          </div>
        </li> */}
 <li className="dropdown">
          <button className="dropbtn">Profile</button>
          <div className="dropdown-content">
          <li className="navbut"><Link to="/profile">View Profile</Link></li>
          <Link to="/login">Logout</Link>
          </div>
        </li>

        <li className="navbut"><Link to="/tender/create">Tenders</Link></li>
        <li className="navbut"><Link to="/notifications">Notifications</Link></li>
        {/* <li className="navbut"><Link to="/settings">Settings</Link></li> */}
        <li className="navbut"><Link to="/help">Help</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
