import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container text-center py-3 bg-white border-top">
      <p className="mb-0 text-muted small">
        &copy; {new Date().getFullYear()} Super Admin Dashboard. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;