import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // State variables for form data and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // Prepare login data
      const loginData = { email, password };
      // Send request to backend
      // const login = import.meta.env.VITE_LOGIN_URL;
      // const response = await axios.post(`${login}`, loginData);
      const response = await axios.post(`http://localhost:3000/login`, loginData);

      // Handle success: Display message and optionally do further actions
      setMessage('Login successful!');
      setError('');
      console.log('Token:', response.data.token); // Example usage: Store the token in localStorage

      // Clear form fields
      setEmail('');
      setPassword('');
    } catch (err) {
      // Handle error: Set error message
      if (err.response && err.response.data) {
        // Error response from backend
        setError(err.response.data.message || 'Invalid email or password. Please try again.');
      } else {
        // Generic error (e.g., network issue)
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (
      <div>
        <h1>Login</h1>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <br />
          <label>Password:</label>
          <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
  );
};

export default Login;