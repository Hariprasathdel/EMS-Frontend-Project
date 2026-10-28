import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show a Bootstrap spinner while checking authentication status
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted fw-semibold">Verifying session...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the requested page (children). 
  // If not, redirect to /login.
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;