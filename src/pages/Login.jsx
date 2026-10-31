// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Make sure to create this file

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login({ email: email.trim(), password });
      if (!result.success) {
        throw new Error(result.error?.message || 'Invalid credentials. Please check your email and password.');
      }

      navigate('/dashboard', { replace: true });
      
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        {/* Header Icon */}
        <div className="text-center">
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <path d="M9 22v-4h6v4"></path>
              <path d="M8 6h.01"></path>
              <path d="M16 6h.01"></path>
              <path d="M12 6h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 10h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 10h.01"></path>
              <path d="M8 14h.01"></path>
            </svg>
          </div>
          <h3 className="fw-bold mt-3" style={{ color: '#1a202c' }}>Welcome Back</h3>
          <p className="text-muted mb-4">Sign in to your HRMS account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert custom-alert py-2 mb-3 text-center" role="alert">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label custom-label" htmlFor="login-email">Email Address</label>
            <div className="input-group custom-input-group">
              <span className="input-group-text custom-icon-bg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </span>
              <input
                type="email"
                id="login-email"
                className="form-control custom-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label custom-label" htmlFor="login-password">Password</label>
            <div className="input-group custom-input-group focused-ring">
              <span className="input-group-text custom-icon-bg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                className="form-control custom-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span 
                className="input-group-text custom-icon-bg end-icon" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between mb-4 align-items-center">
            <div className="form-check">
              <input type="checkbox" className="form-check-input custom-checkbox" id="rememberMe" />
              <label className="form-check-label text-muted" htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="text-decoration-none custom-link">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className="btn w-100 py-2 custom-btn" 
            disabled={loading}
          >
            {loading ? 'Signing In...' : (
              <>Sign In <span style={{ marginLeft: '5px' }}>→</span></>
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
