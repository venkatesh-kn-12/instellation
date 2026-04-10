import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="page-wrapper" style={{ 
      paddingLeft: '1.2rem', 
      paddingRight: '1.2rem',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', letterSpacing: 'clamp(4px, 2vw, 8px)', color: '#fff', textAlign: 'center', marginBottom: '0.8rem' }}
      >
        COMMAND CENTER
      </motion.h1>
      <p style={{ color: 'var(--dim)', marginBottom: '3rem', letterSpacing: '2px', fontSize: '0.75rem', textAlign: 'center' }}>
        ESTABLISH A DIRECT COMM-LINK
      </p>

      <motion.form 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
        style={{ 
          width: '100%', 
          maxWidth: '600px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem', 
          background: 'rgba(7, 18, 40, 0.7)', 
          padding: 'clamp(1.5rem, 5vw, 3rem)', 
          border: '1px solid var(--border)', 
          position: 'relative',
          backdropFilter: 'blur(12px)',
          borderRadius: '8px'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'var(--gold)', borderRadius: '8px 8px 0 0' }}></div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>TRANSMITTER ID (NAME)</label>
          <input type="text" placeholder="Cadet Name" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201, 168, 76, 0.2)', padding: '0.8rem 0', color: '#fff', outline: 'none', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>FREQUENCY TETHER (EMAIL)</label>
          <input type="email" placeholder="cadet@galaxy.com" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201, 168, 76, 0.2)', padding: '0.8rem 0', color: '#fff', outline: 'none', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>DATA PACKET (MESSAGE)</label>
          <textarea rows="4" placeholder="Type your message..." style={{ background: 'rgba(2, 4, 8, 0.4)', border: '1px solid rgba(201, 168, 76, 0.15)', padding: '1rem', color: '#fff', outline: 'none', marginTop: '0.5rem', resize: 'vertical', fontSize: '1rem', fontFamily: 'var(--font-body)', borderRadius: '4px' }}></textarea>
        </div>

        <button type="button" className="sub-btn" style={{ marginTop: '0.5rem' }}>
          BROADCAST SIGNAL
        </button>
      </motion.form>
    </div>
  );
};

export default Contact;
