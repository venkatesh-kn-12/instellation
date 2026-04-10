import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = () => {
  const [prog, setProg] = useState(0);
  const [gone, setGone] = useState(false);
  const phases = ['Mapping the cosmos…','Aligning planets…','Loading event data…','Calibrating countdown…','Ready for launch…'];
  
  useEffect(() => {
    let currentProg = 0;
    const iv = setInterval(() => {
      currentProg = Math.min(100, currentProg + Math.random() * 8 + 3);
      setProg(currentProg);
      if(currentProg >= 100) {
        clearInterval(iv);
        setTimeout(() => setGone(true), 400);
      }
    }, 80);
    return () => clearInterval(iv);
  }, []);

  if (gone) return null;

  const pi = Math.min(4, Math.floor(prog / 22));

  return (
    <div id="loader" className={prog >= 100 ? 'fading' : ''}>
      <div className="ld-scene">
        <div className="ld-ring-wrap"><div className="ld-ring"></div></div>
        <div className="ld-moon-orbit-x"><div className="ld-moon-orbit-y"><div className="ld-moon"></div></div></div>
        <div className="ld-planet"></div>
      </div>
      <div className="ld-logo">
        {'INSTELLATION'.split('').map((c, i) => (
          <span key={i} className="ld-char" style={{ animationDelay: `${0.5 + i * 0.07}s` }}>{c}</span>
        ))}
      </div>
      <div className="ld-progress">
        <div className="ld-bar" style={{ width: `${prog}%` }}></div>
      </div>
      <div className="ld-status">{phases[pi]}</div>
    </div>
  );
};

export default Preloader;
