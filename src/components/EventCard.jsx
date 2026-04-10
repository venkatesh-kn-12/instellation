import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ e }) => {
  const navigate = useNavigate();
  return (
    <div className="clay" onClick={() => navigate('/universe/' + e.id)}>
      <div className="cp-wrap">
        <div 
          className="cp" 
          style={{
            backgroundImage: `url('${e.img}')`,
            '--cpg': e.cpg,
            '--cpgh': e.cpgh
          }}
        >
          {e.hasSR && <div className="sat-ring"></div>}
        </div>
      </div>
      <div className="e-plbl">{e.planet}</div>
      <div className="e-name">{e.name}</div>
      <div className="e-sub">{e.sub}</div>
      <div className="e-desc">{e.desc.substring(0, 85)}…</div>
      <div className="e-footer">
        <div className="efi">
          <div className="efi-l">Prize</div>
          <div className="efi-v">{e.prize}</div>
        </div>
        <div className="efi">
          <div className="efi-l">Team</div>
          <div className="efi-v">{e.team}</div>
        </div>
      </div>
      <span className="e-cta">View →</span>
    </div>
  );
};

export default EventCard;
