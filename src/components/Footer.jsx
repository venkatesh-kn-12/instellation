import React from 'react';
import { Rocket } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="container footer-content">
        <div className="footer-brand">
          <Rocket className="footer-icon" />
          <span className="footer-logo text-gradient">INSTELLATION 2026</span>
        </div>
        <p className="footer-text">
          A Galactic Technical Fest organized by the Department of MASTER OF COMPUTER APPLICATIONS. 
          Prepare for an interstellar journey of logic, creativity, and skill.
        </p>
        <div className="footer-bottom">
          <p>&copy; 2026 Instellation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
