import React, { useState } from 'react';
import './LoginPage.css';
import { useTender } from '../context/TenderContext'; // Import the TenderContext

const LoginPage = () => {
  const { login } = useTender(); // Use the login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication logic
    const user = { email, role: email.includes('@admin.com') ? 'admin' : 'bidder' }; // Example role assignment

    if (password === 'password') { // Replace with your actual authentication logic
      login(user); // Call the login function from context
      window.location.href = user.role === 'admin' ? '/admin/dashboard' : '/bidder/dashboard'; // Redirect based on role
    } else {
      setError('Invalid email or password'); // Handle authentication error
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
