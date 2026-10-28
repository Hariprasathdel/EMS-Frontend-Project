// src/pages/NotFound.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-page__overlay"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 text-center notfound-content">
            <h1 className="notfound-code">
              4<span className="notfound-code__highlight">0</span>4
            </h1>

            <div className="notfound-icon">
              <i className="bi bi-compass"></i>
            </div>

            <h3 className="notfound-title">Oops! Page Not Found</h3>
            <p className="notfound-message">
              The page you're looking for doesn't exist, was removed, or is
              temporarily unavailable. Let's get you back on track.
            </p>

            <div className="notfound-actions">
              <button
                className="btn notfound-btn notfound-btn--light"
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Go Back
              </button>
              <Link to="/dashboard" className="btn notfound-btn notfound-btn--outline">
                <i className="bi bi-house-door me-2"></i>
                Go to Dashboard
              </Link>
            </div>

            <div className="notfound-links">
              <p className="notfound-links__title">You might be looking for:</p>
              <div className="notfound-links__row">
                <Link to="/attendance" className="notfound-links__item">
                  My Attendance
                </Link>
                <Link to="/leave" className="notfound-links__item">
                  Leave
                </Link>
                <Link to="/salary-slip" className="notfound-links__item">
                  Salary Slip
                </Link>
                <Link to="/rules-policy" className="notfound-links__item">
                  Rules & Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;