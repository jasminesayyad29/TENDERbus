import React from 'react';
import './UserProfilePage.css';

const UserProfilePage = () => {
  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <p>Update your personal details and password.</p>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Update Password" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfilePage;
