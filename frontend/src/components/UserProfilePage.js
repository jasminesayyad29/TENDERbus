import React, { useEffect, useState } from 'react';
import './UserProfilePage.css';

const UserProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Adjust URL to your backend endpoint
        const data = await response.json();
        setUser({
          name: data.name,
          email: data.email,
          oldPassword: '', // Do not fetch password for security reasons
          newPassword: '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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

  return (
    <pre className='mainn'>
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
   <br/>
   <br/><br/><br/><br/><br/><br/></pre>
  );
};

export default UserProfilePage;
