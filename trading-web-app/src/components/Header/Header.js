import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuthContext();
  const { success } = useNotifications();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    success('You have been successfully logged out');
    navigate('/');
    setMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">TradePro</Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/stock/AAPL">Stocks</Link></li>
            {isAuthenticated && <li><Link to="/portfolio">Portfolio</Link></li>}
          </ul>
        </nav>
        <div className="user-controls">
          {isAuthenticated ? (
            <div className="user-menu">
              <button className="user-menu-button" onClick={toggleMenu}>
                <span className="user-name">{currentUser?.name || 'User'}</span>
                <span className="user-icon">▾</span>
              </button>
              
              {menuOpen && (
                <div className="dropdown-menu">
                  <Link to="/portfolio" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    My Portfolio
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    Profile Settings
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
