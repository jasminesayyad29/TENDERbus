import React, { useState } from 'react';
import './LoginPage.css'; // Assuming you'll have a similar style like `Login.css`
import { useTender } from '../context/TenderContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useTender(); // Use the login function from context
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'bidder',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => { // Mark as async
    e.preventDefault();
    const { email, password, role } = formData;

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        role,
      });

        console.log(role)
      // Assuming the response contains user data, you can store it
      const user = response.data.user; // Adjust this according to your API response
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user)); // Store user details in local storage

      alert('Login successful!');
      navigate(role === 'admin' ? '/admin/dashboard' : '/bidder/dashboard'); // Navigate based on role
    } catch (error) {
      console.error('Login failed', error);
      if (error.response) {
        // API returned a response
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection.');
      } else {
        // Something else happened in setting up the request
        setError('Error occurred: ' + error.message);
      }
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
