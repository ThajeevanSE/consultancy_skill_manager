import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    background: '#333',
    color: '#fff',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '20px'
  };

  return (
    <nav style={navStyle}>
      <h2>Consultancy Manager</h2>
      <div>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/personnel" style={linkStyle}>Personnel</Link>
        <Link to="/skills" style={linkStyle}>Skills</Link>
        <Link to="/projects" style={linkStyle}>Projects</Link>
      </div>
    </nav>
  );
};

export default Navbar;