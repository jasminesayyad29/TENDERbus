import React, { useEffect, useState } from 'react';
import './UserProfilePage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      fetchUserData(); // Fetch user data only if logged in
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser((prevUser) => ({
          ...prevUser,
          name: storedUser.name,
          email: storedUser.email,
        }));
      }
    } catch (error) {
      console.error('Error fetching user data from local storage:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="pro-profilelogin-prompt">
        <h2>Please Login First</h2>
        <button onClick={() => navigate('/login')} className="pro-profilelogin-button">
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="pro-user-profile-wrapper">
        <h2 className="pro-user-profile-header">User Details</h2>
        <div className="pro-user-profile-details">
          <p className="pro-user-profile-info">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="pro-user-profile-info">
            <strong>Email:</strong> {user.email}
          </p>
          <button className="pro-logout-button">
            <Link to="/login" className="pro-logout-link">Logout</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
