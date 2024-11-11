// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        const parsedUpdatedUser = JSON.parse(updatedUser);
        setUserRole(parsedUpdatedUser.role);
      } else {
        setUserRole('');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar">
  <div class="tender">
  <a href="/">
    <img src="/logowhite.png" alt="TENDERbus Logo" class="logotender" />
  </a>
</div>

      <ul className="nav-links">
        {!userRole && (
          <li className="custom-dropdown">
            <button className="custom-dropbtn"><Link to="/login">Login</Link></button>
          </li>
        )}
        <a href="/" className="link">Home</a>
        <li className="navbut"><Link to="/tender/tenders">Open Tenders</Link></li>

        {userRole === 'Bidder' && (
          <>
            <button className="dropbtn"><Link to="/profile">Profile</Link></button>
            <li className="navbut"><Link to="/notifications">Live chat with T/O</Link></li>
            <li className="navbut"><Link to="/bidder/dashboard">Dashboard</Link></li>
            <li className="navbut"><Link to="/Bidder/notifications">T/O Suggestion</Link></li>
          </>
        )}

        {userRole === 'Tender Officer' && (
          <>
            <button className="dropbtn"><Link to="/profile">Profile</Link></button>
            <li className="navbut"><Link to="/notifications">Live chat with Bidder</Link></li>
            <li className="navbut"><Link to="/admin/dashboard">Dashboard</Link></li>
            <li className="navbut"><Link to="/admin/admin-send-notifications">Notify Bidder</Link></li>
          </>
        )}

        <li className="navbut"><Link to="/help">Help</Link></li>
        <a href="/about" className="link">About us</a>
      </ul>
    </nav>
  );
};

export default Navbar;
