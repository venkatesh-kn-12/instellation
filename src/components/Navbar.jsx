/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/image.png';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'UNIVERSE', path: '/universe' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SPONSORS', path: '/sponsors' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src={logoImg} alt="DSATM Logo" style={{ height: '32px', width: 'auto', filter: 'drop-shadow(0 0 5px rgba(201, 168, 76, 0.4))' }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="logo-inste">INSTEL</span>
              <span className="logo-llation">LATION</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/register" className="nav-btn-register">
            REGISTER NOW
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-content">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path} 
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/register" className="mobile-nav-btn-register">
                  REGISTER NOW
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
