import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="page-wrapper" style={{ 
      paddingLeft: '1rem', 
      paddingRight: '1rem',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', letterSpacing: 'clamp(4px, 2vw, 8px)', color: '#fff', textAlign: 'center', marginBottom: '2.5rem' }}
      >
        ORIGINS
      </motion.h1>

      <div style={{ 
        maxWidth: '900px', 
        width: '100%', 
        padding: 'clamp(1.5rem, 5vw, 3.5rem)', 
        background: 'rgba(5, 12, 24, 0.7)', 
        border: '1px solid var(--border)', 
        borderLeft: '4px solid var(--gold)', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)'
      }}>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: '1.8', color: 'var(--dim)', marginBottom: '1.8rem' }}
        >
          <strong style={{ color: 'var(--gold)', fontSize: '1.15em', letterSpacing: '1px' }}>INSTEL­LATION</strong> is more than just a technical fest. It is a cosmic convergence of minds, a 48-hour anomaly where the brightest developers, engineers, and creators gather to bend the rules of reality through code.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: '1.8', color: 'var(--dim)', marginBottom: '2.2rem' }}
        >
          Organized by the Department of MCA, our mission is to provide an orbital platform for raw talent. Whether you are hacking the mainframe, deploying quantum neural structures, or building the next generation of decentralized web protocols, this is your launchpad.
        </motion.p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '2rem', 
          marginTop: '2.5rem', 
          borderTop: '1px solid rgba(255,255,255,0.08)', 
          paddingTop: '2rem' 
        }}>
          <div style={{ minWidth: '120px' }}>
            <h4 style={{ color: 'var(--gold)', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', marginBottom: '0.2rem' }}>48+</h4>
            <span style={{ color: 'var(--dim2)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>HOURS LIVE</span>
          </div>
          <div style={{ minWidth: '120px' }}>
            <h4 style={{ color: 'var(--gold)', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', marginBottom: '0.2rem' }}>10K+</h4>
            <span style={{ color: 'var(--dim2)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>PRIZE POOL</span>
          </div>
          <div style={{ minWidth: '120px' }}>
            <h4 style={{ color: 'var(--gold)', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', marginBottom: '0.2rem' }}>500+</h4>
            <span style={{ color: 'var(--dim2)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>ATTENDEES</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
