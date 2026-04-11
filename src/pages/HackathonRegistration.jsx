import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Registration.css'; // Reusing the identical CSS file
import upiQr from '../assets/upi-qr.jpeg';

const HackathonRegistration = () => {
  const [formData, setFormData] = useState({
    name: '', // Team Leader
    college: '',
    email: '',
    phone: '',
    events: ['hackathon'], // Fixed to Hackathon
    team: '',
    year: '',
    department: '',
    upi: ''
  });
  const [teamMembers, setTeamMembers] = useState(['']); // Start with 1 additional member (2 members total)
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, value) => {
    const updated = [...teamMembers];
    updated[index] = value;
    setTeamMembers(updated);
  };

  const addMember = () => {
    if (teamMembers.length < 3) { // 1 leader + max 3 extra members = 4 total
      setTeamMembers([...teamMembers, '']);
    }
  };

  const removeMember = (index) => {
    const updated = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // UTR Validation: exactly 12 digits
    const utrRegex = /^\d{12}$/;
    if (!utrRegex.test(formData.upi)) {
      alert("UTR number must be exactly 12 numeric digits.");
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, teamMembers, eventName: 'Nova Nexus — 6-Hour Hackathon' })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', college: '', email: '', phone: '', events: ['hackathon'], team: '', year: '', department: '', upi: '' });
        setTeamMembers(['']);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="page-wrapper">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2.5rem)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily:'var(--font-heading)', fontSize:'.64rem', letterSpacing:'5px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'.8rem', display:'block' }}>
            Ignite The Supernova
          </span>
          <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'clamp(1.9rem,4vw,3rem)', fontWeight:700, color:'var(--white)', lineHeight:1.1 }}>
            Hackathon <em style={{ color:'transparent', WebkitTextStroke:'1px var(--gold)', fontStyle:'normal' }}>Registration</em>
          </h2>
          <p style={{ color:'var(--dim)', marginTop:'.9rem', fontSize:'.9rem', lineHeight:1.85, fontWeight:300, maxWidth:580, margin:'0 auto' }}>
            Register your team for Nova Nexus to secure your participation in the 6-hour coding marathon.
          </p>
          <div style={{ width:'1px', height:'55px', background:'linear-gradient(180deg,var(--gold),transparent)', margin:'1.5rem auto 0' }}></div>
        </div>

        <motion.div 
          className="reg-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="reg-grid">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label>Team Name</label>
                  <input type="text" name="team" placeholder="Squad name" required value={formData.team} onChange={handleChange} />
                </div>
                <div className="field">
                   <label>Selected Event</label>
                   <input type="text" value="Nova Nexus — Hackathon" disabled style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--gold)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1rem' }}>
                <div className="field">
                  <label>Team Leader Name</label>
                  <input type="text" name="name" placeholder="Leader's full name" required value={formData.name} onChange={handleChange} />
                </div>

                {teamMembers.map((member, index) => (
                  <div className="field" key={index} style={{ position: 'relative', marginBottom: 0 }}>
                    <label>Team Member {index + 2} Name {index > 0 ? '(Optional)' : ''}</label>
                    <input 
                      type="text" 
                      placeholder={`Member ${index + 2} name`} 
                      required={index < 1} 
                      value={member} 
                      onChange={(e) => handleMemberChange(index, e.target.value)} 
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => removeMember(index)} style={{ position:'absolute', right: '10px', top: '36px', background:'none', border:'none', color:'#ff6b6b', cursor:'pointer', fontSize:'1rem' }}>✖</button>
                    )}
                  </div>
                ))}
              </div>

              {teamMembers.length < 3 && (
                <div style={{ textAlign: 'left', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={addMember} style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: '0.3s' }}>
                    + Add Team Member
                  </button>
                </div>
              )}
              
              <div className="form-row">
                <div className="field">
                  <label>Leader's Email Address</label>
                  <input type="email" name="email" placeholder="your@email.com" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Leader's Phone Number</label>
                  <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>College / Institution</label>
                  <input type="text" name="college" placeholder="College name" required value={formData.college} onChange={handleChange} />
                </div>
                <div className="field">
                  <label>Department / Course</label>
                  <input type="text" name="department" placeholder="MCA / BSC / BCA…" required value={formData.department} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>Year of Study</label>
                  <select name="year" required value={formData.year} onChange={handleChange}>
                    <option value="" disabled>— Year —</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">Final Year</option>
                  </select>
                </div>
                <div className="field">
                  <label>UPI Transaction / UTR ID</label>
                  <input 
                    type="text" 
                    name="upi" 
                    placeholder="Enter 12-digit UTR after payment" 
                    required 
                    value={formData.upi} 
                    onChange={handleChange}
                    pattern="[0-9]{12}"
                    maxLength="12"
                    title="UTR number must be exactly 12 digits (numeric only)"
                  />
                </div>
              </div>

              <button type="submit" className="sub-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Launching...' : 'Submit Team Registration →'}
              </button>

              {status === 'success' && (
                <div style={{ marginTop: '1rem', color: '#7de89a', fontSize: '0.86rem', textAlign: 'center', background: 'rgba(26,100,40,.2)', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(50,180,80,.4)' }}>
                  ✓ Registration Received! Check your email.
                </div>
              )}
              {status === 'error' && (
                <div style={{ marginTop: '1rem', color: '#ff6b6b', fontSize: '0.86rem', textAlign: 'center', background: 'rgba(100,26,26,.2)', padding: '0.8rem', borderRadius: '4px', border: '1px solid rgba(180,50,50,.4)' }}>
                  ✗ Comms failure. Please try again.
                </div>
              )}
            </form>

            <div>
              <div className="qr-panel">
                <span className="qr-t">Scan to Pay</span>
                <div className="qr-wrap">
                  <div className="qr-img" style={{ display: 'block', padding: '6px' }}>
                    <img src={upiQr} alt="Scan to Pay" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                  </div>
                  <div className="qr-c tl"></div><div className="qr-c tr"></div>
                  <div className="qr-c bl"></div><div className="qr-c br"></div>
                </div>
                <div className="upi-box">
                  <span className="upi-l">UPI ID</span>
                  <div className="upi-id">6360215241@kotak811</div>
                </div>
                <p className="pay-note">Scan QR or use UPI ID to pay. Enter the UTR number in the form field.</p>
                <div style={{ marginTop:'1rem', padding:'.75rem', background:'rgba(7,18,40,.5)', borderRadius:'6px', fontSize:'.7rem', color:'var(--dim)', lineHeight:2, border:'1px solid rgba(201,168,76,.1)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <span>Nova Nexus — Hackathon</span>
                    <span style={{ color:'var(--gold)' }}>₹500 / Team</span>
                  </div>
                </div>
              </div>

              <div className="notice-box">
                <span className="nb-t">Important Notes</span>
                <div style={{ 
                  color: 'var(--gold)', 
                  fontWeight: 600, 
                  marginBottom: '0.8rem', 
                  paddingBottom: '0.5rem', 
                  borderBottom: '1px solid rgba(255,255,255,0.1)' 
                }}>
                  Registration is strictly open from now until May 5th.
                </div>
                ✦ Hackathon takes place on May 7th<br/>
                ✦ Fee non-refundable after submission<br/>
                ✦ Carry college IDs on event day<br/>
                ✦ Confirmation email within 24 hours<br/>
                ✦ No On-spot registration 
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HackathonRegistration;
