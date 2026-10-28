import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content text-center">
        <div className="not-found-illustration mb-4">
          <i className="bi bi-exclamation-triangle text-primary"></i>
        </div>
        <h1 className="display-1 fw-bold text-dark mb-3">404</h1>
        <h3 className="fw-bold text-dark mb-3">Page Not Found</h3>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '500px' }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/dashboard" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold">
          <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;