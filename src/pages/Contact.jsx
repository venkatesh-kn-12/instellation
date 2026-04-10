import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', college: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

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
        onSubmit={handleSubmit}
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
          <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Cadet Name" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201, 168, 76, 0.2)', padding: '0.8rem 0', color: '#fff', outline: 'none', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>FREQUENCY TETHER (EMAIL)</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="cadet@galaxy.com" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201, 168, 76, 0.2)', padding: '0.8rem 0', color: '#fff', outline: 'none', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }} />
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>COMM-DEVICE (PHONE)</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201, 168, 76, 0.2)', padding: '0.8rem 0', color: '#fff', outline: 'none', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }} />
          </div>

          <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>BASE ACADEMY (COLLEGE)</label>
            <input type="text" name="college" required value={formData.college} onChange={handleChange} placeholder="College Name" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(201, 168, 76, 0.2)', padding: '0.8rem 0', color: '#fff', outline: 'none', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: 600 }}>DATA PACKET (MESSAGE)</label>
          <textarea rows="4" name="message" required value={formData.message} onChange={handleChange} placeholder="Type your message..." style={{ background: 'rgba(2, 4, 8, 0.4)', border: '1px solid rgba(201, 168, 76, 0.15)', padding: '1rem', color: '#fff', outline: 'none', marginTop: '0.5rem', resize: 'vertical', fontSize: '1rem', fontFamily: 'var(--font-body)', borderRadius: '4px' }}></textarea>
        </div>

        <button type="submit" disabled={status === 'submitting'} className="sub-btn" style={{ marginTop: '0.5rem', padding: '1rem', background: 'var(--gold)', color: '#000', border: 'none', borderRadius: '4px', fontFamily: 'var(--font-heading)', fontWeight: 700, cursor: 'pointer' }}>
          {status === 'submitting' ? 'TRANSMITTING...' : 'BROADCAST SIGNAL'}
        </button>

        {status === 'success' && (
          <div style={{ marginTop: '1rem', color: '#7de89a', fontSize: '0.86rem', textAlign: 'center', background: 'rgba(26,100,40,.2)', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(50,180,80,.4)' }}>
            ✓ Message transmitted! We will review your query shortly.
          </div>
        )}
        {status === 'error' && (
          <div style={{ marginTop: '1rem', color: '#ff6b6b', fontSize: '0.86rem', textAlign: 'center', background: 'rgba(100,26,26,.2)', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(180,50,50,.4)' }}>
            ✗ Transmission failure. Core system offline. Please try again.
          </div>
        )}
      </motion.form>
    </div>
  );
};

export default Contact;
