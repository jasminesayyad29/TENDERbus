import React, { useEffect, useState } from 'react';
import './UserProfilePage.css';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  });
  const [isEditing, setIsEditing] = useState(false);
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
          oldPassword: '',
          newPassword: '',
        }));
      } else {
        console.warn("No user data found in local storage.");
      }
    } catch (error) {
      console.error('Error fetching user data from local storage:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.oldPassword) {
      alert('Please enter your current password to update your profile.');
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok) {
        alert('User information updated successfully!');
        setIsEditing(false);
        setUser((prevUser) => ({
          ...prevUser,
          oldPassword: '',
          newPassword: '',
        }));
      } else {
        alert(result.message || 'Failed to update information. Please check your current password.');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="profilelogin-prompt">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h2>Please Login First !!!</h2>
        <button onClick={() => navigate('/login')} className="profilelogin-button">Go to Login</button>
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
  }

  return (
    <div className="user-profile-wrapper">
      <h2 className="user-profile-header">User Details</h2>
      {!isEditing ? (
        <div className="user-profile-details">
          <p className="user-profile-info"><strong>Name:</strong> {user.name}</p>
          <p className="user-profile-info"><strong>Email:</strong> {user.email}</p>
          <button className="edit-profile-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form className="user-profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={user.oldPassword}
              onChange={handleInputChange}
              placeholder="Enter current password"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={user.newPassword}
              onChange={handleInputChange}
              placeholder="Leave blank to keep current password"
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UserProfilePage;
