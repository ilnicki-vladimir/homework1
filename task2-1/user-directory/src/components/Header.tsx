import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const isUserDetails = location.pathname.includes('/user/');

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1>👥 User Directory</h1>
          </Link>
          <p className="subtitle">Frontend User Directory Application</p>
        </div>
        
        <nav className="header-nav">
          {isUserDetails && (
            <Link to="/" className="nav-link back-link">
              ← Back to Users
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 