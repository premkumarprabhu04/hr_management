import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email (e.g., name@gmail.com)';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    } else if (!/\d/.test(password)) {
      errors.password = 'Password must include at least one number';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validate()) return;

    try {
      // In a real app, this would hit the backend
      // const response = await axios.post('http://localhost:8000/api/auth/login', {
      //   email,
      //   password
      // });
      // setSuccess(response.data.message);
      
      // For demonstration of the frontend dashboard:
      setSuccess('Login successful');
      if (onLoginSuccess) {
        setTimeout(onLoginSuccess, 500); // short delay to show success message
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="logo">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="12" r="6" fill="#059669"/>
            <circle cx="12" cy="26" r="6" fill="#059669"/>
            <circle cx="28" cy="26" r="6" fill="#10b981"/>
          </svg>
          <span className="logo-text">PeoplePlus</span>
        </div>
        
        <h1 className="main-heading">
          Your People,<br />
          Our Priority.
        </h1>
        
        <p className="subheading">
          A simple HR management<br />
          system for your organization.
        </p>
        
        
        <div className="decorative-line"></div>
      </div>

      <div className="right-section">
        <div className="login-form">
          <h2 className="welcome-title">Welcome back</h2>
          <p className="login-subtitle">Login to your HR account</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Email address</label>
              <div className={`input-wrapper ${validationErrors.email ? 'error' : ''}`}>
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 5l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input 
                  type="email" 
                  placeholder="name@gmail.com" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationErrors.email) setValidationErrors(prev => ({ ...prev, email: null }));
                  }}
                  required
                />
              </div>
              {validationErrors.email && <span className="error-message-small">{validationErrors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className={`input-wrapper ${validationErrors.password ? 'error' : ''}`}>
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="4" y="9" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••••••" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationErrors.password) setValidationErrors(prev => ({ ...prev, password: null }));
                  }}
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
              {validationErrors.password && <span className="error-message-small">{validationErrors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="sign-in-btn">Login</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
