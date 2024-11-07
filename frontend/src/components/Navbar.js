// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Retrieve the user data from localStorage on component mount
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);  // Set the user's role (Bidder, Admin, etc.)
    }

    // Add event listener to listen for localStorage changes (when login/logout occurs)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        const parsedUpdatedUser = JSON.parse(updatedUser);
        setUserRole(parsedUpdatedUser.role);
      } else {
        setUserRole(''); // Reset role when user is logged out
      }
    };

    // Listen for changes in localStorage (e.g., logout action)
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <nav className="navbar">
      <div className="tender">
        <a href="/" className="link">TENDERbus</a>
      </div>
      <ul className="nav-links">
        {/* Profile Dropdown */}
        <li className="dropdown">
          <button className="dropbtn">Profile</button>
          <div className="dropdown-content">
            <li className="navbut"><Link to="/profile">View Profile</Link></li>
            <Link to="/login">Logout</Link>
          </div>
        </li>

        {/* Conditionally Render Dashboard for Bidder */}
        {userRole === 'Bidder' && (
          <li className="navbut"><Link to="/bidder/dashboard">Dashboard</Link></li>
        )}

        {/* Conditionally Render Dashboard for Tender Officer */}
        {userRole === 'Tender Officer' && (
          <li className="navbut"><Link to="/admin/dashboard">Dashboard</Link></li>
        )}

        <li className="navbut"><Link to="/tender/view">Tenders</Link></li>
        <li className="navbut"><Link to="/notifications">Notifications</Link></li>
        {/* <li className="navbut"><Link to="/settings">Settings</Link></li> */}
        <li className="navbut"><Link to="/help">Help</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
