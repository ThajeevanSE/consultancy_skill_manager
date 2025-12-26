import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); 

  const styles = {
    nav: {
      background: 'linear-gradient(90deg, #1F2937 0%, #111827 100%)', 
      padding: '0 30px',
      height: '70px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    brand: {
      fontSize: '1.5rem',
      fontWeight: '700',
      letterSpacing: '-0.025em',
      background: 'linear-gradient(90deg, #6366F1 0%, #818CF8 100%)', 
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    menu: {
      display: 'flex',
      gap: '5px'
    },
    link: (path) => ({
      color: location.pathname === path ? '#ffffff' : '#9CA3AF', 
      textDecoration: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '0.95rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      background: location.pathname === path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    })
  };

  return (
    <nav style={styles.nav}>
      {/* Brand Logo */}
      <Link to="/" style={styles.brand}>
        <span role="img" aria-label="rocket" style={{ fontSize: '1.8rem' }}>🚀</span> 
        <span style={{ color: 'white', WebkitTextFillColor: 'initial' }}>Consultancy</span>Manager
      </Link>

      {/* Navigation Links */}
      <div style={styles.menu}>
        <Link to="/" style={styles.link('/')}>
          Dashboard
        </Link>
        <Link to="/personnel" style={styles.link('/personnel')}>
          Personnel
        </Link>
        <Link to="/skills" style={styles.link('/skills')}>
          Skills
        </Link>
        <Link to="/projects" style={styles.link('/projects')}>
          Projects
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;