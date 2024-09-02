import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css'; // Import the CSS file

const Navbar = ({ user, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Movieflexia</h1>
        <div className="hamburger" onClick={toggleMenu} aria-label="Toggle menu" role="button">
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* Desktop navigation links */}
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>
          )}
          {user ? (
            <li>
              <button className="logout" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/watchlist" onClick={toggleMenu}>
                  Watchlist
                </Link>
              </li>
            )}
            {user ? (
              <li>
                <button className="logout" onClick={() => { handleLogout(); toggleMenu(); }}>
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
