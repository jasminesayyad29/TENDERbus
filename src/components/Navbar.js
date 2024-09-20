// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">TENDERbus</div>
      <ul className="nav-links">
        {/* Dropdown for Account (Register/Login) */}
        <li className="dropdown">
          <button className="dropbtn">Account</button>
          <div className="dropdown-content">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        </li>

        {/* Dropdown for Dashboards */}
        <li className="dropdown">
          <button className="dropbtn">Dashboards</button>
          <div className="dropdown-content">
            <Link to="/admin/dashboard">Admin Dashboard</Link>
            <Link to="/bidder/dashboard">Bidder Dashboard</Link>
          </div>
        </li>

        <li className="navbut"><Link to="/profile">Profile</Link></li>
        <li className="navbut"><Link to="/tender/create">Tenders</Link></li>
        <li className="navbut"><Link to="/notifications">Notifications</Link></li>
        <li className="navbut"><Link to="/settings">Settings</Link></li>
        <li className="navbut"><Link to="/help">Help</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
