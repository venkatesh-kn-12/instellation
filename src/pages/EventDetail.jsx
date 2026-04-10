import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { EV } from '../data/events';
import './EventDetail.css';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const e = EV.find(x => x.id === eventId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!e) {
    return (
      <div style={{ paddingTop: '8rem', textAlign: 'center', minHeight: '100vh' }}>
        <h2>Event Not Found</h2>
        <Link to="/universe" className="btn-g btn-o">Return to Universe</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(1rem, 5vw, 2.5rem)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back to Universe</button>
      </div>

      <div className="dt-hero">
        <div className="dt-planet" style={{ backgroundImage: `url('${e.img}')`, boxShadow: e.dtSh }}>
          {e.hasSR && <div className="dt-ring"></div>}
        </div>
        <span className="dt-lbl">{e.planet} · Instellation 2026 · Event #{e.order}</span>
        <h1 className="dt-title">{e.name}</h1>
        <p className="dt-sub">{e.sub}</p>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem clamp(1rem, 5vw, 2.5rem) 4rem' }}>
        <div className="dt-stats">
          <div className="dt-stat"><span className="dts-l">Prize Pool</span><span className="dts-v">{e.prize}</span></div>
          <div className="dt-stat"><span className="dts-l">Team Size</span><span className="dts-v">{e.team}</span></div>
          <div className="dt-stat"><span className="dts-l">Entry Fee</span><span className="dts-v">{e.fee}</span></div>
          <div className="dt-stat"><span className="dts-l">Date</span><span className="dts-v">May 6, 2026</span></div>
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
          <p style={{ color: 'var(--dim)', fontSize: '.82rem', marginBottom: '1.5rem' }}>Ready to embark on this mission?</p>
          <Link to={`/register?event=${e.id}`} className="btn-g btn-p" style={{ padding: '.9rem 3rem' }}>
            Register for {e.name} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

