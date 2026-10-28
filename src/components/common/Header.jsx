import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header = () => {
  // 1. Get Auth Data
  const { user, logout } = useAuth();
  
  // 2. Get Theme Data
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header-container d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm">
      
      {/* Left Side: Search Bar */}
      <div className="search-bar flex-grow-1 mx-4">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input 
            type="text" 
            className="form-control border-start-0 ps-0" 
            placeholder="Search employees, reports, policies..." 
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="d-flex align-items-center gap-3">
        
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          style={{ width: '40px', height: '40px' }}
        >
          <i className={`bi ${theme === 'light' ? 'bi-moon-stars-fill' : 'bi-sun-fill'} text-warning`}></i>
        </button>

        {/* Notification Bell */}
        <div className="notification-icon position-relative cursor-pointer p-2">
          <i className="bi bi-bell fs-5 text-muted"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
            3
          </span>
        </div>

        {/* User Profile & Logout */}
        <div className="user-profile d-flex align-items-center gap-2 cursor-pointer ms-2">
          <div className="text-end d-none d-md-block">
            <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Super Admin</small>
            <span className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
              {user?.name || 'Super_admin'}
            </span>
          </div>
          
          {/* Avatar */}
          <img 
            src="https://ui-avatars.com/api/?name=Super+Admin&background=4f46e5&color=fff" 
            alt="User Avatar" 
            className="rounded-circle border"
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />

          {/* Logout Button */}
          <button 
            onClick={logout} 
            className="btn btn-outline-danger btn-sm rounded-circle ms-1 d-flex align-items-center justify-content-center"
            title="Logout"
            style={{ width: '32px', height: '32px' }}
          >
            <i className="bi bi-box-arrow-right" style={{ fontSize: '0.9rem' }}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
