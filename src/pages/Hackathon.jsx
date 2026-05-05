import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './EventDetail.css';

const Hackathon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const e = {
    id: 'hackathon',
    name: 'Nova Nexus',
    sub: 'Ignite the Supernova — 6-Hour Hackathon',
    img: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Keplers_supernova.jpg',
    planet: 'Supernova',
    order: 'Day 2 Special',
    dtSh: '0 0 100px rgba(180,50,220,.7)',
    hasSR: true,
    prize: '₹4,000',
    team: '2-4 Members',
    fee: '₹500/team',
    date: 'May 7, 2026',
    desc: 'Welcome to Nova Nexus, the premier 6-hour marathon of unparalleled coding and innovation! Ignite your creativity as you build a functional product from scratch in a high-pressure, space-themed environment. Whether it\'s a web app, a mobile solution, or an AI tool, your limits will be tested. Will you shine bright like a supernova?',
    rules: [
      'The hackathon duration is exactly 6 hours on May 7.',
      'Teams must consist of 2 to 4 members.',
      'Participants must bring their own laptops and chargers.',
      'A specific problem statement or theme will be revealed on the spot.',
      'Use of AI tools and open-source libraries is generally permitted unless explicitly stated otherwise.',
      'The final product will be judged on innovation, functionality, user experience, and technical complexity.',
      'Plagiarism or bringing pre-built, complete projects will lead to instant disqualification.'
    ],
    coords: [
      { name: 'Akshatha', ph: '+91 9740552962' },
      { name: 'Shashank S', ph: '+91 9380112063' }
    ]
  };

  return (
    <div className="page-wrapper">
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2.5rem)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <div className="dt-hero">
        <div className="dt-planet" style={{ backgroundImage: `url('${e.img}')`, boxShadow: e.dtSh }}>
          {e.hasSR && <div className="dt-ring"></div>}
        </div>
        <span className="dt-lbl">{e.planet} · Instellation 2026 · {e.order}</span>
        <h1 className="dt-title">{e.name}</h1>
        <p className="dt-sub">{e.sub}</p>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem clamp(1rem, 5vw, 2.5rem) 4rem' }}>
        <div className="dt-stats">
          <div className="dt-stat"><span className="dts-l">Prize Pool</span><span className="dts-v">{e.prize}</span></div>
          <div className="dt-stat"><span className="dts-l">Team Size</span><span className="dts-v">{e.team}</span></div>
          <div className="dt-stat"><span className="dts-l">Entry Fee</span><span className="dts-v">{e.fee}</span></div>
          <div className="dt-stat"><span className="dts-l">Date</span><span className="dts-v">{e.date}</span></div>
        </div>

        <div className="dt-sec">
          <h3>About the Event</h3>
          <p className="dt-p">{e.desc}</p>
        </div>

        <div className="dt-sec">
          <h3>Rules &amp; Regulations</h3>
          <ul className="rules-ul">
            {e.rules.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>

        <div className="dt-sec">
          <h3>Event Coordinators</h3>
          <div className="coord-row">
            {e.coords.map((c, i) => (
              <div key={i} className="coord-card">
                <div className="cc-n">{c.name}</div>
                <a href={`tel:${c.ph.replace(/\s+/g, '')}`} className="cc-p">{c.ph}</a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--dim)', fontSize: '.82rem', marginBottom: '1.5rem' }}>Ready to embark on this 6-hour mission?</p>
          {/* <Link to="/hackathon/register" className="btn-g btn-p" style={{ padding: '.9rem 3rem' }}>
            Register for {e.name} →
          </Link> */}
          <p style={{ color: 'red', fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Registrations are Closed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hackathon;
