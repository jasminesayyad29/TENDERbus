import React, { useState } from 'react';
import './LoginPage.css'; // Assuming you'll have a similar style like `Login.css`
import { useTender } from '../context/TenderContext';

const LoginPage = () => {
  const { login } = useTender(); // Use the login function from context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'bidder',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication logic
    const { email, password, role } = formData;
    const user = { email, role: email.includes('@admin.com') ? 'admin' : 'bidder' };

    if (password === 'password') {
      login(user); // Log in user
      window.location.href = user.role === 'admin' ? '/admin-dashboard' : '/bidder-dashboard'; // Redirect based on role
    } else {
      setError('Invalid email or password');
    }
  };

  return ( 
  <>

    
    <div className="login-container">
    
      <form onSubmit={handleSubmit} className="login-form">
      <h2>Login Here</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="bidder">Bidder</option>
            <option value="admin">Tender Officer</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>} 
        <button type="submit" className='loginbutton'>Login</button>
        <p>
          Don't have an account? <a href="/Register">Sign up</a>
        </p>
      </form>
    </div>
    </>
  );
};

export default LoginPage;
